import { main } from './hackathon2020'

$(document).ready(
  main({
    momentSelector: '.hacking-camp-moment',
    milestones: ['2021.7.31', '2021.8.16', '2021.9.16', '2021.10.16'],
  })
)
