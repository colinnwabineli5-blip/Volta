import { useState } from 'react'
import emailjs from '@emailjs/browser'

function Checkout({ cart, setPage, onOrderComplete }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const [sending, setSending] = useState(false)

  const total = cart.reduce(
    (sum, item) => sum + item.priceValue * item.quantity,
    0
  )

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const generateOrderId = () => {
    const random = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()
    return `VOLTA-${random}`
  }

  const buildItemsString = () => {
    return cart
      .map(
        (item) =>
          `${item.quantity} × ${item.name} (Size ${item.size}) — ₦${(
            item.priceValue * item.quantity
          ).toLocaleString()}`
      )
      .join('\n')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert('Your bag is empty.')
      return
    }

    setSending(true)

    const orderId = generateOrderId()

    const templateParams = {
      order_id: orderId,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      customer_address: form.address,
      items: buildItemsString(),
      total: total.toLocaleString(),
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )

      onOrderComplete()

      alert(
        `Order ${orderId} sent successfully!\n\nWe will contact you shortly to confirm payment and delivery.`
      )

      setPage('home')
    } catch (error) {
      console.error('EmailJS error:', error)
      alert(
        'Something went wrong while sending your order. Please try again or contact us directly.'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="inner-page">

      <section className="page-intro cart-intro">
        <p className="small-label">VOLTA / CHECKOUT</p>

        <h1>
          COMPLETE
          <br />
          <span>ORDER.</span>
        </h1>
      </section>

      <section className="checkout-section">

        {/* FORM */}
        <form
          className="contact-form checkout-form"
          onSubmit={handleSubmit}
        >
          <p className="small-label">YOUR DETAILS</p>

          <label>
            FULL NAME
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </label>

          <label>
            EMAIL
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            PHONE NUMBER
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+234 xxx xxx xxxx"
              required
            />
          </label>

          <label>
            DELIVERY ADDRESS
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, city, state"
              rows="3"
              required
            />
          </label>

          <button
            className="checkout-button"
            type="submit"
            disabled={sending}
          >
            {sending ? 'SENDING ORDER...' : 'PLACE ORDER →'}
          </button>
        </form>

        {/* SUMMARY */}
        <aside className="cart-summary">
          <p className="small-label">ORDER SUMMARY</p>

          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="cart-summary-row"
            >
              <span>
                {item.quantity} × {item.name} ({item.size})
              </span>
              <strong>
                ₦{(item.priceValue * item.quantity).toLocaleString()}
              </strong>
            </div>
          ))}

          <div className="cart-summary-total">
            <span>TOTAL</span>
            <strong>₦{total.toLocaleString()}</strong>
          </div>
        </aside>

      </section>

    </main>
  )
}

export default Checkout