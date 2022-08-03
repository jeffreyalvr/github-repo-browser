import "./styles.css";

const Footer = () => (
  <footer>
    <span>
      made by{" "}
      <a
        href="https://github.com/jeffreyalvr"
        target="_blank"
        rel="noopener noreferrer"
        title="Click to open my GitHub"
      >
        @jeffreyalvr
      </a>
    </span>
    <p className="disclaimer">
      GitHub is not affiliated with this website in any way.
    </p>
    <p className="disclaimer">All data belongs to their respective owners.</p>
  </footer>
);

export default Footer;
