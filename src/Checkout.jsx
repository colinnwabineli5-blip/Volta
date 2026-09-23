import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaystackPop from '@paystack/inline-js'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

function Checkout({ cart, onOrderComplete }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const [sending, setSending] = useState(false)
  const [paid, setPaid] = useState(false)

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

  const sendOrderEmail = async (orderId) => {
    const templateParams = {
      order_id: orderId,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      customer_address: form.address,
      items: buildItemsString(),
      total: total.toLocaleString(),
    }

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      }
    )
  }

  const handlePayment = () => {
    if (cart.length === 0) {
      toast.error('Your bag is empty.')
      return
    }

    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error('Please fill in all your details first.')
      return
    }

    const orderId = generateOrderId()

    const paystack = new PaystackPop()

    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: total * 100,
      currency: 'NGN',
      reference: orderId,
      metadata: {
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: form.name,
          },
          {
            display_name: 'Phone',
            variable_name: 'phone',
            value: form.phone,
          },
          {
            display_name: 'Address',
            variable_name: 'address',
            value: form.address,
          },
        ],
      },
      onSuccess: async (transaction) => {
        setPaid(true)
        setSending(true)

        try {
          await sendOrderEmail(transaction.reference)

          onOrderComplete()

          toast.success(
            `Payment successful. Order ${transaction.reference} confirmed.`,
            { duration: 6000 }
          )

          navigate('/')
        } catch (error) {
          console.error('Email error:', error)
          toast.error(
            'Payment received but we had trouble sending your order confirmation. Please contact us directly.',
            { duration: 8000 }
          )
          navigate('/')
        } finally {
          setSending(false)
          setPaid(false)
        }
      },
      onCancel: () => {
        toast.error('Payment cancelled. You can try again when ready.')
      },
      onError: (error) => {
        console.error('Payment error:', error)
        toast.error(
          'Something went wrong with the payment. Please try again or contact us directly.'
        )
      },
    })
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

        <div className="contact-form checkout-form">

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
            onClick={handlePayment}
            disabled={sending || paid}
          >
            {paid
              ? 'PAYMENT RECEIVED ✓'
              : sending
              ? 'PROCESSING...'
              : `PAY ₦${total.toLocaleString()} →`}
          </button>

          <p className="checkout-note">
            Secure payment powered by Paystack. You'll be asked to
            pay with your card or bank transfer.
          </p>

        </div>

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