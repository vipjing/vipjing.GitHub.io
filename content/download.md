---
type: page
layout: download
title: Download
url: /download
image: /images/pingcap-opengraph.jpg
---

<div class="ins-env-icon">
    <img src="https://download.pingcap.com/images/download-tidb/mac-icon.png" alt="icon"/>
</div>

### TiUP install instructions (Recommended):

1. Download and install TiUP:

    {{< copyable "shell-regular" >}}

    ```shell
    curl --proto '=https' --tlsv1.2 -sSf https://tiup-mirrors.pingcap.com/install.sh | sh
    ```

2. Declare the global environment variable:

    > **Note:**
    >
    > After the installation, TiUP displays the absolute path of the corresponding `profile` file. You need to modify the following `source` command according to the path.

    {{< copyable "shell-regular" >}}

    ```shell
    source .bash_profile
    ```

3. Start the cluster in the current session:

    - If you want to start a TiDB cluster of the latest version with 1 TiDB instance, 1 TiKV instance, and 1 PD instance, run the following command:

        {{< copyable "shell-regular" >}}

        ```shell
        tiup playground
        ```

    - If you want to specify the TiDB version and the number of the instances of each component, run a command like this:

        {{< copyable "shell-regular" >}}

        ```shell
        tiup playground v4.0.0-rc --db 2 --pd 3 --kv 3 --monitor
        ```

        The command downloads a v4.0.0-rc cluster to the local machine and starts it.

        `--monitor` means that the monitoring component is also deployed.

        This command returns the access methods of the cluster:

        ```log
        CLUSTER START SUCCESSFULLY, Enjoy it ^-^
        To connect TiDB: mysql --host 127.0.0.1 --port 4000 -u root
        To connect TiDB: mysql --host 127.0.0.1 --port 4001 -u root
        To view the dashboard: http://127.0.0.1:2379/dashboard
        To view the monitor: http://127.0.0.1:9090
        ```

4. Start a new session to access TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    mysql --host 127.0.0.1 --port 4000 -u root
    ```

### Homebrew install instructions:

1. Install [Homebrew](https://brew.sh/).

2. Install TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    brew tap pingcap/brew
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    brew install tidb-server
    ```

3. Start TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    tidb-server
    ```

4. If you would like to connect a MySQL client to TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    brew install mysql-client
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    mysql -h 127.0.0.1 -P4000 -uroot
    ```

### DBdeployer instructions:

1. Install [DBdeployer](https://github.com/datacharmer/dbdeployer#Installation).

2. Install MySQL 5.7:

    {{< copyable "shell-regular" >}}

    ```shell
    curl -LO https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.25-macos10.14-x86_64.tar.gz
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    dbdeployer unpack mysql-5.7.25-macos10.14-x86_64.tar.gz
    ```

3. Install TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    curl -O https://download.pingcap.org/tidb-master-darwin-amd64.tar.gz
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    dbdeployer unpack mysql-5.7.25-macos10.14-x86_64.tar.gz
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    dbdeployer deploy single 3.0.0 --client-from=5.7.25
    ```

<div class="ins-env-icon">
    <img src="https://download.pingcap.com/images/download-tidb/linux-icon.png" alt="icon"/>
</div>

### TiUP install instructions (Recommended):

1. Download and install TiUP:

    {{< copyable "shell-regular" >}}

    ```shell
    curl --proto '=https' --tlsv1.2 -sSf https://tiup-mirrors.pingcap.com/install.sh | sh
    ```

2. Declare the global environment variable:

    > **Note:**
    >
    > After the installation, TiUP displays the absolute path of the corresponding `profile` file. You need to modify the following `source` command according to the path.

    {{< copyable "shell-regular" >}}

    ```shell
    source .bash_profile
    ```

3. Start the cluster in the current session:

    - If you want to start a TiDB cluster of the latest version with 1 TiDB instance, 1 TiKV instance, and 1 PD instance, run the following command:

        {{< copyable "shell-regular" >}}

        ```shell
        tiup playground
        ```

    - If you want to specify the TiDB version and the number of the instances of each component, run a command like this:

        {{< copyable "shell-regular" >}}

        ```shell
        tiup playground v4.0.0-rc --db 2 --pd 3 --kv 3 --monitor
        ```

        The command downloads a v4.0.0-rc cluster to the local machine and starts it.

        `--monitor` means that the monitoring component is also deployed.

        This command returns the access methods of the cluster:

        ```log
        CLUSTER START SUCCESSFULLY, Enjoy it ^-^
        To connect TiDB: mysql --host 127.0.0.1 --port 4000 -u root
        To connect TiDB: mysql --host 127.0.0.1 --port 4001 -u root
        To view the dashboard: http://127.0.0.1:2379/dashboard
        To view the monitor: http://127.0.0.1:9090
        ```

4. Start a new session to access TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    mysql --host 127.0.0.1 --port 4000 -u root
    ```

### Homebrew install instructions:

1. Install [Homebrew](https://brew.sh/).

2. Install TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    brew tap pingcap/brew
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    brew install tidb-server
    ```

3. Start TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    tidb-server
    ```

4. If you would like to connect a MySQL client to TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    brew install mysql-client
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    mysql -h 127.0.0.1 -P4000 -uroot
    ```

### DBdeployer instructions:

1. Install [DBdeployer](https://github.com/datacharmer/dbdeployer#Installation).

2. Install MySQL 5.7:

    {{< copyable "shell-regular" >}}

    ```shell
    dbdeployer remote get mysql-5.7.25
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    dbdeployer unpack mysql-5.7.25.tar.xz
    ```

3. Install TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    wget https://download.pingcap.org/tidb-master-linux-amd64.tar.gz
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    dbdeployer unpack tidb-master-linux-amd64.tar.gz --unpack-version=3.0.0
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    dbdeployer deploy single 3.0.0 --client-from=5.7.25
    ```

<div class="ins-env-icon">
    <img src="https://download.pingcap.com/images/download-tidb/windows-icon.png" alt="icon"/>
</div>

### Homebrew install instructions (via Windows Subsystem for Linux):

1. Install [Homebrew](https://brew.sh/).

2. Install TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    brew tap pingcap/brew
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    brew install tidb-server
    ```

3. Start TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    tidb-server
    ```

4. If you would like to connect a MySQL client to TiDB:

    {{< copyable "shell-regular" >}}

    ```shell
    brew install mysql-client
    ```

    {{< copyable "shell-regular" >}}

    ```shell
    mysql -h 127.0.0.1 -P4000 -uroot
    ```
