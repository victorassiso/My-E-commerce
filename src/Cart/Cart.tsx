import CartItem from '../CartItem/CartItem';
import Button from '@material-ui/core/Button'
//Styles
import { Wrapper } from './Cart.styles'
//Types
import { CartItemType } from '../App'

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickerItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((accumulator: number, item) => accumulator + item.amount * item.price, 0);

    return (
        <Wrapper>
            <h2>My Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: R${calculateTotal(cartItems).toFixed(2)}</h2>
            {cartItems.length === 0
            ? 
                <Button
                className="checkout unavailable"
                size="large"
                variant="contained"
                pointer-events="none"
                >
                    <strong>CHECKOUT</strong>
                </Button>
            :
                <Button
                className="checkout"
                size="large"
                variant="contained"
                >
                    <strong>CHECKOUT</strong>
                </Button>
            }
        </Wrapper>
    );
};

export default Cart;
