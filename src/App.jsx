import { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom'
import toast from 'react-hot-toast'
import Intro from './Intro'
import Checkout from './Checkout'
import './App.css'

const products = [
  {
    id: 1,
    name: 'VOLTA Custom Arsenal Jersey',
    price: '₦20,000',
    priceValue: 20000,
    image: '/volta-arsenal-jersey.png',
    description:
      'Rep the Gunners your way with a custom Volta Arsenal jersey — bold, personal, and made to stand out.',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['Breathable', 'Relaxed Fit', 'Made in Nigeria'],
  },
  {
    id: 2,
    name: 'VOLTA Legacy Jersey (Mint)',
    price: '₦20,000',
    priceValue: 20000,
    image: '/volta-jersey-mint.jpeg',
    description:
      'Clean, fresh, and effortlessly stylish — the Volta Legacy Jersey is made to stand out on and off the pitch.',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['Breathable', 'Relaxed Fit', 'Made in Nigeria'],
  },
  {
    id: 3,
    name: 'VOLTA Legacy Jersey (Blue)',
    price: '₦20,000',
    priceValue: 20000,
    image: '/volta-jersey-blue.jpeg',
    description:
      'Clean, fresh, and effortlessly stylish — the Volta Legacy Jersey is made to stand out on and off the pitch.',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['Breathable', 'Relaxed Fit', 'Made in Nigeria'],
  },
  {
    id: 4,
    name: 'VOLTA Legacy Jersey (Green)',
    price: '₦20,000',
    priceValue: 20000,
    image: '/volta-jersey-green.jpeg',
    description:
      'Clean, fresh, and effortlessly stylish — the Volta Legacy Jersey is made to stand out on and off the pitch.',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['Breathable', 'Relaxed Fit', 'Made in Nigeria'],
  },
]

/* =========================
   ICONS
========================= */

function MenuIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <path d="M4 7H20" stroke="currentColor" strokeWidth="2" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" />
      <path d="M4 17H20" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <path d="M5 5L19 19" stroke="currentColor" strokeWidth="2" />
      <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 8H18L19 20H5L6 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 9V6C9 4.3 10.3 3 12 3C13.7 3 15 4.3 15 6V9"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

/* =========================
   HEADER
========================= */

function Header({ menuOpen, setMenuOpen, cartCount }) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!menuOpen) return

    const handleEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [menuOpen, setMenuOpen])

  const go = (path) => {
    setMenuOpen(false)
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentPath = location.pathname

  return (
    <>
      <header className="header">

        <button
          className="header-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <button
          className="header-button bag-button"
          onClick={() => go('/cart')}
          aria-label="Shopping bag"
        >
          <BagIcon />
          <span className="bag-number">{cartCount}</span>
        </button>

      </header>

      <div className={`menu ${menuOpen ? 'menu-open' : ''}`}>

        <div
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
        />

        <div className="menu-content">

          <span className="menu-title">MENU</span>

          <button
            className={
              currentPath === '/' ? 'menu-link active' : 'menu-link'
            }
            onClick={() => go('/')}
          >
            HOME
          </button>

          <button
            className={
              currentPath === '/catalogue'
                ? 'menu-link active'
                : 'menu-link'
            }
            onClick={() => go('/catalogue')}
          >
            CATALOGUE
          </button>

          <button
            className={
              currentPath === '/contact'
                ? 'menu-link active'
                : 'menu-link'
            }
            onClick={() => go('/contact')}
          >
            CONTACT
          </button>

          <div className="menu-footer">
            VOLTA — OWN THE MOMENT
          </div>

        </div>
      </div>
    </>
  )
}

/* =========================
   PRODUCT CARD
========================= */

function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <article
      className="product-card"
      onClick={() => {
        navigate(`/product/${product.id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          navigate(`/product/${product.id}`)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
    >
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          className="product-image-img"
        />
      </div>

      <div className="product-details">
        <div>
          <h3>{product.name}</h3>
          <p>VOLTA COLLECTION</p>
        </div>
        <strong>{product.price}</strong>
      </div>
    </article>
  )
}

/* =========================
   HOME PAGE
========================= */

function HomePage() {
  const navigate = useNavigate()

  return (
    <main>
      <section className="intro">
        <div className="intro-left">
          <img
            src="/volta-logo.png"
            alt="VOLTA"
            className="hero-logo"
          />
          <p className="small-label">VOLTA / NEW ARRIVALS</p>
          <h1>
            OWN THE <span>MOMENT.</span>
          </h1>
        </div>

        <p className="intro-text">
          Contemporary pieces made for the moments that matter.
        </p>
      </section>

      <section className="products-section">
        <div className="products-heading">
          <div>
            <p className="small-label">01 / SHOP</p>
            <h2>NEW ARRIVALS</h2>
          </div>

          <button
            className="catalogue-button"
            onClick={() => {
              navigate('/catalogue')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            CATALOGUE →
          </button>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="brand-strip">
        <div>
          <p className="small-label blue-label">VOLTA</p>
          <h2>MOVE WITH PURPOSE.</h2>
        </div>
        <p>Designed for people who create their own moment.</p>
      </section>
    </main>
  )
}

/* =========================
   PRODUCT PAGE
========================= */

function ProductPage({ onAddToCart }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <main className="inner-page">
        <section className="page-intro">
          <p className="small-label">VOLTA / PRODUCT</p>
          <h1>
            NOT <span>FOUND.</span>
          </h1>
        </section>
      </main>
    )
  }

  const related = products.filter((p) => p.id !== product.id)

  const decreaseQuantity = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1))
  }

  const increaseQuantity = () => {
    setQuantity((q) => q + 1)
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast.error('Please select a size first.')
      return
    }
    onAddToCart(product, selectedSize, quantity)
    setQuantity(1)
    setSelectedSize('')
    navigate('/cart')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="inner-page">
      <section className="product-page">

        <div className="product-page-image">
          <img
            src={product.image}
            alt={product.name}
            className="product-page-image-img"
          />
        </div>

        <div className="product-page-info">

          <button
            className="back-button"
            onClick={() => navigate('/')}
          >
            ← BACK
          </button>

          <p className="small-label">VOLTA COLLECTION</p>

          <h1>{product.name}</h1>

          <strong className="product-page-price">
            {product.price}
          </strong>

          <p className="product-page-description">
            {product.description}
          </p>

          <div className="size-section">
            <p className="small-label">SELECT SIZE</p>

            <div className="size-list">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={
                    selectedSize === size
                      ? 'size-button size-active'
                      : 'size-button'
                  }
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <p className="small-label">QUANTITY</p>

            <div className="quantity-control">
              <button
                className="quantity-button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-button"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button className="add-to-bag" onClick={handleAddToBag}>
            ADD TO BAG →
          </button>

          <div className="product-details-list">
            <p className="small-label">DETAILS</p>
            <ul>
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      <section className="products-section">
        <div className="products-heading">
          <div>
            <p className="small-label">YOU MAY ALSO LIKE</p>
            <h2>MORE FROM VOLTA</h2>
          </div>
        </div>

        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  )
}

/* =========================
   CART PAGE
========================= */

function CartPage({ cart, onUpdateQty, onRemove }) {
  const navigate = useNavigate()

  const total = cart.reduce(
    (sum, item) => sum + item.priceValue * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <main className="inner-page">
        <section className="page-intro">
          <p className="small-label">VOLTA / BAG</p>
          <h1>
            YOUR BAG IS
            <br />
            <span>EMPTY.</span>
          </h1>
          <p>
            Looks like you haven't added anything yet.
            Explore the collection and find your moment.
          </p>
          <button
            className="empty-cart-button"
            onClick={() => navigate('/')}
          >
            SHOP NOW →
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="inner-page">
      <section className="page-intro cart-intro">
        <p className="small-label">VOLTA / BAG</p>
        <h1>
          YOUR
          <br />
          <span>BAG.</span>
        </h1>
      </section>

      <section className="cart-section">
        <div className="cart-items">
          {cart.map((item) => (
            <article
              key={`${item.id}-${item.size}`}
              className="cart-item"
            >
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item-info">
                <div className="cart-item-top">
                  <div>
                    <h3>{item.name}</h3>
                    <p className="cart-item-size">
                      SIZE: {item.size}
                    </p>
                  </div>
                  <button
                    className="cart-remove"
                    onClick={() => onRemove(item.id, item.size)}
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>

                <div className="cart-item-bottom">
                  <div className="quantity-control quantity-control-small">
                    <button
                      className="quantity-button"
                      onClick={() =>
                        onUpdateQty(
                          item.id,
                          item.size,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-value">
                      {item.quantity}
                    </span>
                    <button
                      className="quantity-button"
                      onClick={() =>
                        onUpdateQty(
                          item.id,
                          item.size,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <strong className="cart-item-price">
                    ₦
                    {(
                      item.priceValue * item.quantity
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <p className="small-label">ORDER SUMMARY</p>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <strong>₦{total.toLocaleString()}</strong>
          </div>

          <div className="cart-summary-row">
            <span>Shipping</span>
            <strong>Calculated at checkout</strong>
          </div>

          <div className="cart-summary-total">
            <span>TOTAL</span>
            <strong>₦{total.toLocaleString()}</strong>
          </div>

          <button
            className="checkout-button"
            onClick={() => navigate('/checkout')}
          >
            CHECKOUT →
          </button>

          <button
            className="continue-button"
            onClick={() => navigate('/')}
          >
            ← CONTINUE SHOPPING
          </button>
        </aside>
      </section>
    </main>
  )
}

/* =========================
   CATALOGUE PAGE
========================= */

function CataloguePage() {
  return (
    <main className="inner-page">
      <section className="page-intro">
        <p className="small-label">VOLTA / CATALOGUE</p>
        <h1>
          THE VOLTA
          <br />
          <span>WORLD.</span>
        </h1>
        <p>
          Discover new product updates, collection
          stories and what is coming next from VOLTA.
        </p>
      </section>

      <section className="products-section">
        <div className="products-heading">
          <div>
            <p className="small-label">02 / CATALOGUE</p>
            <h2>ALL PRODUCTS</h2>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="catalogue-list">
        <article className="catalogue-row">
          <span>01</span>
          <div>
            <p className="small-label">CURRENT COLLECTION</p>
            <h2>THE MOMENT</h2>
            <p>
              Our foundation. Everyday pieces built
              around confidence, simplicity and movement.
            </p>
          </div>
          <strong>AVAILABLE</strong>
        </article>

        <article className="catalogue-row">
          <span>02</span>
          <div>
            <p className="small-label">COMING SOON</p>
            <h2>AFTER DARK</h2>
            <p>
              A darker collection inspired by night
              movement and city energy.
            </p>
          </div>
          <strong className="blue-text">SOON</strong>
        </article>

        <article className="catalogue-row">
          <span>03</span>
          <div>
            <p className="small-label">UPDATES</p>
            <h2>NEW DROPS</h2>
            <p>
              New VOLTA products and limited releases
              will be announced here first.
            </p>
          </div>
          <strong>UPDATES</strong>
        </article>
      </section>
    </main>
  )
}

/* =========================
   CONTACT PAGE
========================= */

function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    toast.success('Thank you for contacting VOLTA.')
    setForm({ name: '', email: '', message: '' })
  }

  const whatsappNumber = '2349056544866'
  const whatsappMessage = encodeURIComponent(
    'Hi VOLTA, I have a question about your products.'
  )

  return (
    <main className="inner-page">
      <section className="contact-intro">
        <div>
          <p className="small-label">VOLTA / CONTACT</p>
          <h1>
            LET'S
            <br />
            <span>TALK.</span>
          </h1>
          <p>
            Questions about products, collections
            or upcoming drops? Get in touch.
          </p>
        </div>

        <div className="contact-box">
          <span>VOLTA</span>
          <strong>OWN THE MOMENT</strong>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <p className="small-label">CONTACT</p>
          <h2>GET IN TOUCH</h2>

          <a
            href="mailto:tamiloreajiboye08@gmail.com"
            className="contact-card"
          >
            <span className="contact-card-label">EMAIL</span>
            <span className="contact-card-value">
              tamiloreajiboye08@gmail.com
            </span>
          </a>

          <a href="tel:+2349056544866" className="contact-card">
            <span className="contact-card-label">PHONE</span>
            <span className="contact-card-value">
              +234 905 654 4866
            </span>
          </a>

          <div className="contact-card contact-card-static">
            <span className="contact-card-label">LOCATION</span>
            <span className="contact-card-value">
              Abuja, Nigeria
            </span>
          </div>

          <a
            href="https://www.instagram.com/volta_nigeria"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-button"
          >
            FOLLOW ON INSTAGRAM →
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            CHAT ON WHATSAPP →
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            NAME
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
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
            MESSAGE
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows="6"
              required
            />
          </label>

          <button className="submit-button" type="submit">
            SEND MESSAGE →
          </button>
        </form>
      </section>
    </main>
  )
}

/* =========================
   FOOTER
========================= */

function Footer() {
  const navigate = useNavigate()

  const go = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <img
            src="/volta-logo.png"
            alt="VOLTA"
            className="footer-logo"
          />
          <div className="footer-brand-name">VOLTA</div>
          <div className="footer-brand-motto">OWN THE MOMENT</div>
        </div>

        <p>
          Contemporary clothing.
          <br />
          Own the moment.
        </p>

        <div className="footer-navigation">
          <button onClick={() => go('/')}>HOME</button>
          <button onClick={() => go('/catalogue')}>
            CATALOGUE
          </button>
          <button onClick={() => go('/contact')}>CONTACT</button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 VOLTA</span>
        <span>OWN THE MOMENT.</span>
      </div>
    </footer>
  )
}

/* =========================
   MAIN APP
========================= */

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  /* Load cart from localStorage on first render */
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return []

    try {
      const saved = localStorage.getItem('volta-cart')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Failed to load cart:', error)
      return []
    }
  })

  /* Save cart to localStorage whenever it changes */
  useEffect(() => {
    try {
      localStorage.setItem('volta-cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Failed to save cart:', error)
    }
  }, [cart])

  /* Intro */
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return true
    const seen = sessionStorage.getItem('volta-intro-seen')
    return seen !== 'true'
  })

  const handleIntroFinish = () => {
    sessionStorage.setItem('volta-intro-seen', 'true')
    setShowIntro(false)
  }

  /* Cart logic */
  const addToCart = (product, size, quantity) => {
    setCart((current) => {
      const existingIndex = current.findIndex(
        (item) => item.id === product.id && item.size === size
      )

      if (existingIndex !== -1) {
        const updated = [...current]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          priceValue: product.priceValue,
          image: product.image,
          size,
          quantity,
        },
      ]
    })
  }

  const updateQuantity = (id, size, newQty) => {
    if (newQty < 1) return

    setCart((current) =>
      current.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    )
  }

  const removeFromCart = (id, size) => {
    setCart((current) =>
      current.filter(
        (item) => !(item.id === id && item.size === size)
      )
    )
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  if (showIntro) {
    return <Intro onFinish={handleIntroFinish} />
  }

  return (
    <div className="app">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cartCount={cartCount}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/product/:id"
          element={<ProductPage onAddToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateQty={updateQuantity}
              onRemove={removeFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              onOrderComplete={clearCart}
            />
          }
        />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App