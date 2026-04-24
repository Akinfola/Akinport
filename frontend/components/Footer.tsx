export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer">
      <div className="copyright">
        &copy; Copyright{' '}
        <strong>
          <span>Akintek⚡</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
        Designed by{' '}
        <a href="#">
          Akintek⚡
        </a>{' '}
      </div>
    </footer>
  );
}
