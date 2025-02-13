export function Popup({ heading, children, footing, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={e => e.stopPropagation()}>
        {heading && <header className="popup-header">{heading}</header>}
        <main className="popup-main">{children}</main>
        {footing && <footer className="popup-footer">{footing}</footer>}
      </div>
    </div>
  )
}
