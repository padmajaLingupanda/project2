export interface ExampleArticle {
  id: string;
  title: string;
  content: string;
  source: string;
  category: 'fake' | 'real';
}

export const exampleArticles: ExampleArticle[] = [
  {
    id: '1',
    title: 'SHOCKING: Doctors HATE This One Simple Trick That Cures Everything!!!',
    content: 'You won\'t believe what scientists are hiding from you! An anonymous insider revealed that drinking lemon water can cure cancer, diabetes, and even aging! The pharmaceutical industry doesn\'t want you to know this EXPLOSIVE truth! Sources say that this miracle cure has been suppressed for decades. Click here to learn the shocking secret that will change your life forever! This unbelievable discovery will blow your mind!',
    source: 'Unknown Health Blog',
    category: 'fake'
  },
  {
    id: '2',
    title: 'Climate Scientists Report Record Ocean Temperatures in 2024',
    content: 'According to data released by the National Oceanic and Atmospheric Administration (NOAA) on January 15, 2024, global ocean temperatures reached their highest levels since record-keeping began in 1880. Dr. Sarah Chen, lead climatologist, stated, "The average surface temperature was 0.95°C above the 20th-century average." The report includes measurements from over 3,000 monitoring stations worldwide and has been peer-reviewed by independent scientists.',
    source: 'Reuters',
    category: 'real'
  },
  {
    id: '3',
    title: 'BREAKING ALERT: Government Plans to Ban All Coffee Next Week!',
    content: 'Rumor has it that the government will ban coffee nationwide starting next Monday! Anonymous sources claim this is part of a secret plan to control the population. You need to stock up NOW before it\'s too late! This terrifying news is being suppressed by mainstream media! Insider leaks suggest that coffee will be classified as a dangerous substance. Don\'t let them take away your freedom! Share this before it gets deleted!',
    source: 'Unconfirmed Insider Report',
    category: 'fake'
  },
  {
    id: '4',
    title: 'European Central Bank Raises Interest Rates by 0.25%',
    content: 'The European Central Bank announced on March 12, 2024, an increase in its benchmark interest rate from 4.25% to 4.50%. ECB President Christine Lagarde explained during the press conference, "This measured adjustment reflects our ongoing efforts to stabilize inflation while supporting economic growth." The decision was made following a review of economic data from the eurozone, including inflation figures of 2.8% for February. Financial analysts from Goldman Sachs and JP Morgan had anticipated this move.',
    source: 'Bloomberg',
    category: 'real'
  },
  {
    id: '5',
    title: 'Scientists Discover New Species of Deep-Sea Octopus',
    content: 'Researchers from the Monterey Bay Aquarium Research Institute announced on February 8, 2024, the discovery of a new octopus species at a depth of 3,200 meters in the Pacific Ocean. The species, tentatively named Muusoctopus janeiro, was documented using remotely operated vehicles during a expedition funded by the National Science Foundation. Dr. Janet Voight, curator of invertebrates at the Field Museum, confirmed that the specimen exhibits unique characteristics including translucent skin and unusually large eyes adapted for deep-sea environments.',
    source: 'Associated Press',
    category: 'real'
  },
  {
    id: '6',
    title: 'URGENT: Eating Carrots Will Make You See Through Walls - Doctors Shocked!',
    content: 'Amazing breakthrough that the establishment doesn\'t want you to know! Allegedly, people who eat 50 carrots a day develop supernatural vision powers! This mind-blowing secret was leaked by an anonymous doctor who claims the medical industry has been hiding this for profit. Unbelievable testimonials from unknown sources prove this works 100% of the time! The government is furious that this information got out! Share immediately before they remove this!',
    source: 'Unknown',
    category: 'fake'
  }
];
