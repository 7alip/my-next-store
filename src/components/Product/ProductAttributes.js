import { Header, Button, Modal } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../redux/product/product.actions'

function ProductAttributes({ description, _id }) {
  const { user } = useSelector(state => state.authReducer)

  const [modal, setModal] = React.useState(false)
  const isRoot = user && user.role === 'root'
  const isAdmin = user && user.role === 'admin'
  const isRootOrAdmin = isRoot || isAdmin

  const dispatch = useDispatch()

  async function handleDelete() {
    dispatch(deleteProduct(_id))
  }

  return (
    <>
      <Header as='h3'>About this product</Header>
      <p>{description}</p>

      {isRootOrAdmin && (
        <>
          <Button
            icon='trash alternate outline'
            color='red'
            content='Delete Product'
            onClick={() => setModal(true)}
          />
          <Modal open={modal} dimmer='blurring'>
            <Modal.Header>Confirm Delete</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete this product?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button content='Cancel' onClick={() => setModal(false)} />
              <Button
                negative
                icon='trash'
                labelPosition='right'
                content='Delete'
                onClick={handleDelete}
              />
            </Modal.Actions>
          </Modal>
        </>
      )}
    </>
  )
}

export default ProductAttributes
