import { Item, Label } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import AddProductToChart from './AddProductToCart'

function ProductSummary({ name, mediaUrl, _id, price, sku }) {
  const { user } = useSelector(state => state.authReducer)

  return (
    <Item.Group>
      <Item>
        <Item.Image size='medium' src={mediaUrl} />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>{price}</p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
          <Item.Extra>
            <AddProductToChart user={user} productId={_id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default ProductSummary
