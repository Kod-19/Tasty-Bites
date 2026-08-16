import jollof from '../assets/images/jollof.jpg';
import waakye from '../assets/images/waakye.jpg';
import fufu from '../assets/images/fufu.jpg';
import fried_rice from '../assets/images/fried_rice.jpg';
import yam_and_plantain from '../assets/images/yam_and_plantain.jpg';

export const menuItems = [
  {
    id: 1,
    name: 'Smoky Jollof Rice & Chicken',
    price: '£14.99',
    desc: 'Classic African spice-infused rice served with slow-roasted chicken and fried plantains.',
    query: 'jollof rice',
    image: jollof
  },
  {
    id: 2,
    name: 'Waakye',
    price: '£13.99',
    desc: 'Traditional rice and beans dish cooked with dried sorghum leaves, served with spicy shito, boiled egg, and assorted meats.',
    query: 'waakye',
    image: waakye
  },
  {
    id: 3,
    name: 'Yam and Plantain',
    price: '£13.99',
    desc: 'Golden-fried sweet plantains and boiled or fried white yam slices served with a savory spicy tomato stew or palava sauce.',
    query: 'yam and plaintain',
    image: yam_and_plantain
  },
  {
    id: 4,
    name: 'Fufu with Goat Soup',
    price: '£13.99',
    desc: 'Smooth pounded cassava and green plantain served in a rich, aromatic light soup infused with tender slow-cooked goat meat.',
    query: 'fufu with soup',
    image: fufu
  },
  {
    id: 5,
    name: 'Fried Rice',
    price: '£13.99',
    desc: 'Savory stir-fried rice loaded with crisp vegetables, aromatic herbs, and seasoned spices, served with grilled chicken or beef.',
    query: 'fried rice',
    image: fried_rice
  }
];