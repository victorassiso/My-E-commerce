import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Bagde from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton } from './App.styles';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

// Get Products
const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

// App
const App = () => {
  const [cartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error} = useQuery<CartItemType[]>(
    'products',
     getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((accumulator: number, item) => accumulator + item.amount, 0);
  
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(previous => {
      //1. Is the item alredy added in the cart?
      const isItemInCart = previous.find(item => item.id === clickedItem.id)
      if (isItemInCart) {
        return previous.map(item => (
          item.id === clickedItem.id
          ? { ...item, amount: item.amount + 1}
          : item
        ));
      }
      // First time the item is added
      return [...previous, { ...clickedItem, amount: 1 }]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(previous =>
      previous.reduce((accumulator, item) => {
        if (item.id === id) {
          if (item.amount === 1)
            return accumulator;
          return [...accumulator, {...item, amount: item.amount - 1}];
        } else {
          return [...accumulator, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>
  
  //Return
  return (
  <Wrapper>
    {/*Cart*/}
    <Drawer anchor='right' open={cartOpen} onClose={() => setIsCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
    </Drawer>
    {/*Cart*/}
    <StyledButton onClick={() => setIsCartOpen(true)}>
      <Bagde badgeContent={getTotalItems(cartItems)} color='error'>
        <AddShoppingCartIcon />
      </Bagde>
    </StyledButton>
    {/*Products*/}
    <Grid container spacing={3}>
      {data?.map(item => (
        <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
    </Grid>
  </Wrapper>
  
  )
};

export default App;
