function CopyRightFooter({ loading }) {
  if (loading) {
    return;
  }
  return (
    <div className="">
      <div className="divider"></div>
      <footer className="footer footer-center py-4  text-base-content justify-self-end ">
        <div>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Rashaun Bennett
          </p>
        </div>
      </footer>
    </div>
  );
}

export default CopyRightFooter;
