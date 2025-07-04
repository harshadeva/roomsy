import type { Room } from "@/types/common";

export const allRooms: Room[] = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000',
    title: 'Luxury Suite',
    slug: 'luxury-suite',
    type: 'Suite',
    description: 'A spacious suite with a king-size bed, private balcony, and city view.',
    price: 24500,
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000',
    title: 'Deluxe King Room',
    slug: 'deluxe-king-room',
    type: 'Deluxe',
    description: 'Modern king room with high-speed Wi-Fi and complimentary breakfast.',
    price: 18500,
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000',
    title: 'Standard Twin Room',
    slug: 'standard-twin-room',
    type: 'Standard',
    description: 'Comfortable twin beds with workspace and AC for short stays.',
    price: 12500,
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/6585767/pexels-photo-6585767.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000',
    title: 'Budget Single Room',
    slug: 'budget-single-room',
    type: 'Single',
    description: 'Compact room ideal for solo travelers with essential amenities.',
    price: 8900,
  },
  {
    id: 5,
    image:
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000',
    title: 'Family Room',
    slug: 'family-room',
    type: 'Family',
    description: 'Spacious room with two queen beds and child-friendly facilities.',
    price: 21500,
  },
]


export const getRoom = (slug: string): Room | null => {
  return allRooms.find(room => room.slug === slug) || null
}
