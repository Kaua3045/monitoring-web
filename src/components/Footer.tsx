type StylesType = {
  container: string;
};

const Footer = ({ container }: StylesType) => {
  return (
    <div className={container}>
      <div className="bg-slateDark-50 w-screen h-[84px] shadow-inner">
        <div className="flex items-center justify-center h-full">
          <h5 className="text-white-100">Desenvolvido por Kauã Pereira 💜</h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
