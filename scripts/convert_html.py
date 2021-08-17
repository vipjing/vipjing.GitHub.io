# Convert html links of a tags and src of img tags

from bs4 import BeautifulSoup

import os
import re
import sys

if sys.version_info.major == 3:
    unicode = str

try:
    reload(sys) # Python 2.7
    sys.setdefaultencoding('utf-8')
except NameError:
    pass

abs_hyper_link_pattern = re.compile(r'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}')
image_rel_src_pattern = re.compile(r'^[\.\/]*media\/')
doc_version_pattern = re.compile(r'\/(v\d+\.\d+|stable|dev)')
docs_type_pattern = re.compile(r'(docs|docs-cn)\/(tidb-in-kubernetes|tidb-data-migration)')

file_path = sys.argv[1]
folder = sys.argv[2]
default_version = ''

if file_path == "dist/docs/index.html" or file_path == "dist/docs-cn/index.html":
    default_version = '/stable'

with open(file_path, 'r') as f:
    soup = BeautifulSoup(f.read(), 'lxml')

for link in soup.find_all('a'):
    href = link['href']
    if href:
        if (not abs_hyper_link_pattern.match(href)) and href.rfind('.md') > 0:
            href = href.replace('.md', '')
            href = re.sub(r'^[\.\/]*', '/', href, count=0, flags=0)
            # process links in dm/operator docs, which need to flat url
            if (docs_type_pattern.match(folder)) and len(href.split('/')) > 2:
                length = len(href.split('/'))
                href = href.split('/')[length - 1]
            href = os.path.normpath('/' + folder + default_version + '/' + href)
            link['href'] = href

for img in soup.find_all('img'):
    src = img['src']
    if src:
        if (not abs_hyper_link_pattern.match(src)) and image_rel_src_pattern.match(src):
            _src = re.sub(r'[\.\/]*media\/', '/', src, count=0, flags=0)
            if (doc_version_pattern.search(folder)):
                folder = re.sub(r'\/(v\d+\.\d+|stable|dev)', '', folder)
                if (docs_type_pattern.match(folder)):
                    folder = re.sub(r'(docs|docs-cn)\/', '', folder)
            _src = 'https://download.pingcap.com/images/' + folder + _src
            img['data-original']= _src
            img['src'] = '/images/svgs/loader-spinner.svg'
            img['class'] = 'lazy'
        elif abs_hyper_link_pattern.match(src):
            img['data-original']= src
            img['src'] = '/images/svgs/loader-spinner.svg'
            img['class'] = 'lazy'

# Write html
with open(file_path, 'w') as f:
    f.write(unicode(soup))
