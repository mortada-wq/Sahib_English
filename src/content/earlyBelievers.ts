export type EarlyBelieversMode = 'quotes' | 'counter'

export type EarlyBelieverQuote = {
  name: string
  city: string
  quote: string
  initial: string
  hue: number
}

/** Switch to `'quotes'` when real testimonials are approved. */
export const earlyBelieversMode: EarlyBelieversMode = 'counter'

export const earlyBelieversGoal = 100

/** Update manually or wire to Mailchimp member count later. */
export const earlyBelieversCurrentCount = 12

export const earlyBelieverQuotes: EarlyBelieverQuote[] = [
  {
    name: 'Layla',
    city: 'Baghdad',
    quote:
      "This is the first AI that didn't make my dialect feel like a mistake.",
    initial: 'L',
    hue: 215,
  },
  {
    name: 'Omar',
    city: 'Basra',
    quote: 'It finally sounds like someone from here, not a textbook.',
    initial: 'O',
    hue: 198,
  },
  {
    name: 'Nadia',
    city: 'Erbil',
    quote: 'I used voice first — that alone changed how natural it felt.',
    initial: 'N',
    hue: 232,
  },
  {
    name: 'Youssef',
    city: 'Dubai',
    quote: 'My family in Iraq tested it before I did. They would not stop.',
    initial: 'Y',
    hue: 205,
  },
  {
    name: 'Rana',
    city: 'Amman',
    quote: 'Formal Arabic tools never got the jokes. Sahib did on the first try.',
    initial: 'R',
    hue: 220,
  },
]
