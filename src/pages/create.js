import {
  Header,
  Icon,
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
} from 'semantic-ui-react'
import Axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

const INITIAL_PRODUCT = {
  name: '',
  price: 0.0,
  media: '',
  description: '',
}

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
  const [error, setError] = React.useState('')
  const mediaInput = React.useRef(null)

  React.useEffect(() => {
    const isProduct = Object.values(product).every(value => Boolean(value))

    if (isProduct) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [product])

  function handleChange(event) {
    const { name, value, files } = event.target
    if (name === 'media') {
      setMediaPreview(window.URL.createObjectURL(files[0]))
      return setProduct(prevState => ({ ...prevState, media: files[0] }))
    }

    setProduct(prevState => ({ ...prevState, [name]: value }))
  }

  async function handleImageUpload() {
    const data = new FormData()
    data.append('file', product.media)
    data.append('upload_preset', 'on8bdqgr')
    data.append('cloud_name', 'talip')
    const response = await Axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = response.data.url
    return mediaUrl
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      setLoading(true)
      setError('')
      const mediaUrl = await handleImageUpload()
      const url = `${baseUrl}/api/product`
      const payload = {
        name: product.name,
        price: product.price,
        description: product.description,
        mediaUrl,
      }
      await Axios.post(url, payload)
      setProduct(INITIAL_PRODUCT)
      setMediaPreview('')
      mediaInput.current.inputRef.current.value = ''
      setSuccess(true)
    } catch (err) {
      catchErrors(err, setError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header as='h2' block>
        <Icon name='add' color='orange' />
        Create New Product
      </Header>
      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message error header='Oops!' content={error} />
        <Message
          success
          icon='check'
          header='Success'
          content='Your product has been saved!'
        />
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            name='name'
            label='Name'
            placeholder='Name'
            type='text'
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name='price'
            label='Price'
            placeholder='Price'
            min='0.00'
            step='0.05'
            type='number'
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field>
            <Input
              ref={mediaInput}
              name='media'
              label='Media'
              content='Select Image'
              accept='image/*'
              type='file'
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Image src={mediaPreview} rounded centered size='small' />
        <Form.Field
          control={TextArea}
          name='description'
          label='Description'
          placeholder='Description'
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color='blue'
          icon='pencil alternate'
          content='Submit'
          type='submit'
        />
      </Form>
    </>
  )
}

export default CreateProduct
