import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

type ShoppingCartProps = {
  cartOpen: boolean;
};


export function ShoppingCart({cartOpen}: ShoppingCartProps) {
  const {closeCart} = useShoppingCart();
  return (
    <Offcanvas show={cartOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      {/* cart's body */}
      {/* <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />))}
          

        </Stack>
      </Offcanvas.Body> */}
    </Offcanvas>
  );
}
