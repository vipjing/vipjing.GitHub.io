import { main } from './hackathon2020'

$(document).ready(
  main({
    momentSelector: '.hacking-camp-moment',
    milestones: ['2021.3.14', '2021.3.21', '2021.4.26', '2021.4.29'],
  })
)
