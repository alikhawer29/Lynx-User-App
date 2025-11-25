import images from '../assets/images';

export const BASE_URL = 'https://custom-dev.onlinetestingserver.com:15413/lynx/v1/api';
//export const BASE_URL = 'http://10.0.2.2:5000/lynx/v1/api';

export const USER = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@example.com',
  password: 'Pass@1234',
  password_confirmation: 'Pass@1234',
  dialing_code: '+971',
  country_code: 'AE',
  phone: '501234567',
  language: 'english',
};

export const AUTH_TYPES = [
  {
    value: 'email',
    image: images.email,
    title: 'Send Via Email',
    description: 'Receive Verification Code via Email',
  },
  {
    value: 'phone',
    image: images.phone,
    title: 'Send Via SMS',
    description: 'Receive Verification Code via Phone Number',
  },
];

export const NOTIFICATIONS = [
  {
    id: 1,
    message: 'You receive a payment of $780.1',
    date: '08/27/2025',
    time: '09:01 am',
    read: false,
    image: images.profile_images.one,
  },
  {
    id: 2,
    message: 'You receive a payment of $120.5',
    date: '08/27/2025',
    time: '10:15 am',
    read: true,
    image: images.profile_images.two,
  },
  {
    id: 3,
    message: 'You receive a payment of $450.75',
    date: '08/26/2025',
    time: '03:40 pm',
    read: false,
    image: images.profile_images.one,
  },
  {
    id: 4,
    message: 'You receive a payment of $999.99',
    date: '08/26/2025',
    time: '11:20 am',
    read: true,
    image: images.profile_images.three,
  },
  {
    id: 5,
    message: 'You receive a payment of $50.00',
    date: '08/26/2025',
    time: '07:55 am',
    read: false,
    image: images.profile_images.two,
  },
  {
    id: 6,
    message: 'You receive a payment of $310.25',
    date: '08/26/2025',
    time: '08:10 pm',
    read: true,
    image: images.profile_images.one,
  },
  {
    id: 7,
    message: 'You receive a payment of $875.60',
    date: '08/26/2025',
    time: '04:45 pm',
    read: false,
    image: images.profile_images.three,
  },
  {
    id: 8,
    message: 'You receive a payment of $215.00',
    date: '08/26/2025',
    time: '12:30 pm',
    read: true,
    image: images.profile_images.one,
  },
  {
    id: 9,
    message: 'You receive a payment of $1500.00',
    date: '08/26/2025',
    time: '06:05 am',
    read: false,
    image: images.profile_images.one,
  },
  {
    id: 10,
    message: 'You receive a payment of $640.80',
    date: '08/26/2025',
    time: '09:50 pm',
    read: true,
    image: images.profile_images.two,
  },
];

export const SERVICES = [
  {
    id: 1,
    title: 'Shadow Teachers',
    category: 'Education',
    description:
      'Our shadow teachers work one-on-one with students to provide academic and behavioral support within classroom settings. They help bridge learning gaps, encourage independence.',
    normal_price: 20,
    premium_price: 50,
    rating: 4.5,
    review_count: 120,
    image: images.service.one,
    is_favorite: true,
  },
  {
    id: 2,
    title: 'Music Lessons',
    category: 'Arts',
    description:
      'Professional music lessons designed for beginners and advanced learners. Learn guitar, piano, or violin with certified instructors.',
    normal_price: 30,
    premium_price: 60,
    rating: 4.8,
    review_count: 95,
    image: images.service.one,
    is_favorite: false,
  },
  {
    id: 3,
    title: 'Personal Training',
    category: 'Fitness',
    description:
      'Get customized fitness plans and one-on-one training sessions to reach your health and fitness goals faster.',
    normal_price: 25,
    premium_price: 70,
    rating: 4.7,
    review_count: 200,
    image: images.service.one,
    is_favorite: true,
  },
  {
    id: 4,
    title: 'Cooking Classes',
    category: 'Lifestyle',
    description:
      'Interactive cooking classes to master culinary skills. Learn regional and international cuisines from professional chefs.',
    normal_price: 15,
    premium_price: 40,
    rating: 4.3,
    review_count: 80,
    image: images.service.one,
    is_favorite: false,
  },
  {
    id: 5,
    title: 'Yoga Sessions',
    category: 'Wellness',
    description:
      'Relaxing yoga sessions focused on mindfulness, flexibility, and stress relief, suitable for all levels.',
    normal_price: 18,
    premium_price: 45,
    rating: 4.6,
    review_count: 150,
    image: images.service.one,
    is_favorite: true,
  },
  {
    id: 6,
    title: 'Photography',
    category: 'Arts',
    description:
      'Hands-on photography workshops to learn professional techniques, lighting, and editing for stunning photos.',
    normal_price: 35,
    premium_price: 75,
    rating: 4.9,
    review_count: 60,
    image: images.service.one,
    is_favorite: false,
  },
];

export const LANGUAGES = [
  {
    label: 'English',
    value: 'english',
  },
  {
    label: 'French',
    value: 'french',
  },
];
