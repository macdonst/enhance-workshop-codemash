import db from '@begin/data'
async function main() {
  await db.set({
    table: 'workshops',
    key: 'wksp1',
    title: 'Begginer HTML First Development',
    description: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    image_url: '/_public/workshops/brooke-cagle-unsplash.jpg',
    location: 'maineJS meetup',
    start_date: 'January 10 2023',
    end_date: 'January 11 2023',
    capacity: 10,
    number_enrolled: 5
  })
  await db.set({
    table: 'workshops',
    key: 'wksp2',
    title: 'Intermediate HTML First Development',
    description: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    image_url: '/_public/workshops/brooke-cagle-unsplash.jpg',
    location: 'maineJS meetup',
    start_date: 'January 10 2023',
    end_date: 'January 11 2023',
    capacity: 10,
    number_enrolled: 5
  })
}
main()
