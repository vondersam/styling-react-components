import React from 'react'

function Newsletter(props) {
  const [email, setEmail] = React.useState('')
  const emailPartsCount = countEmailParts(email)
  const [submitHovered, setSubmitHovered] = React.useState(false)
  return (
    <section style={styles.container()}>
      <div style={styles.spectrum()} aria-hidden>
        {Array.from(Array(5)).map((_, i) => (
          <div
            style={styles.bar({ active: i + 1 <= emailPartsCount, i })}
            key={i}
          ></div>
        ))}
      </div>
      <header style={styles.header()}>
        <h2 style={styles.headerH2()}>Get the newsletter</h2>
      </header>
      <input
        style={styles.email()}
        type="email"
        placeholder="Your email"
        value={email}
        onChange={evt => setEmail(evt.target.value)}
      />
      <button
        style={styles.submit({
          active: emailPartsCount >= 5,
          hovered: submitHovered
        })}
        onFocus={() => setSubmitHovered(true)}
        onBlur={() => setSubmitHovered(false)}
        onMouseOver={() => setSubmitHovered(true)}
        onMouseOut={() => setSubmitHovered(false)}
      >
        Sign up
      </button>
    </section>
  )
}

export default Newsletter

const color = {
  spectrum1: '#ff598a',
  spectrum2: '#de56e8',
  spectrum3: '#b36bff',
  spectrum4: '#5b56e8',
  spectrum5: '#5e9fff'
}

const styles = {
  container: () => ({
    position: 'relative',
    maxWidth: '500px',
    fontSize: '24px',
    padding: '1em 1em 2em 1em',
    background: '#2b283d'
  }),
  spectrum: () => ({
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    pointerEvents: 'none'
  }),
  bar: ({ active, i }) => ({
    height: active ? '100%' : '0.5em',
    width: '20%',
    transformOrigin: 'bottom',
    transition: 'all 1s',
    background: color[Object.keys(color)[i % Object.keys(color).length]]
  }),
  barActive: () => ({
    height: '100%'
  }),
  header: () => ({
    position: 'relative',
    color: 'white',
    zIndex: '1',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    fontSize: '0.85em',
    textShadow: '0 3px 2px #000'
  }),
  headerH2: () => ({
    margin: '0 0 0.5em 0'
  }),
  // NOTE: no focus
  email: () => ({
    position: 'relative',
    height: '42px',
    lineHeight: '42px',
    fontSize: '0.85em',
    padding: '0 0.5em',
    width: '100%',
    margin: '0.15em',
    border: '1px solid black'
  }),
  submit: ({ active, hovered }) => ({
    position: 'absolute',
    left: '50%',
    transform: hovered
      ? 'translate(-50%, 50%) rotate(0deg) scale(1.2)'
      : active
      ? 'translate(-50%, 50%) rotate(-5deg)'
      : 'translateX(-50%) rotate(0deg)',
    bottom: '0',
    height: active ? 'auto' : '0',
    width: active ? 'auto' : '0',
    overflow: 'hidden',
    padding: active ? '0.25em 1em' : '0',
    margin: '0',
    background: active ? '#fff' : 'transparent',
    border: '0',
    borderBottom: hovered
      ? `3px solid ${color.spectrum1}`
      : active
      ? `3px solid ${color.spectrum5}`
      : 0,
    textTransform: 'uppercase',
    transition: 'all 300ms',
    fontSize: active ? '1em' : '0',
    zIndex: '1',
    color: '#070222',
    fontWeight: 'bold',
    cursor: 'pointer',
    outlineOffset: '4px',
    outline: hovered ? '2px solid #fff' : 'none'
  })
}

function countEmailParts(email) {
  if (/@.+\..{2,}$/.test(email)) {
    return 5
  } else if (/@.+\..?$/.test(email)) {
    return 4
  } else if (/@.+$/.test(email)) {
    return 3
  } else if (/@/.test(email)) {
    return 2
  } else if (/.+/.test(email)) {
    return 1
  } else {
    return 0
  }
}