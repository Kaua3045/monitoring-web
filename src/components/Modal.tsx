/* eslint-disable jsx-a11y/label-has-associated-control */

type ModalType = {
  showModal: boolean;
  setShowModal: (open: boolean) => void;
  children: JSX.Element;
  title: string;
};

const Modal = ({ showModal, setShowModal, children, title }: ModalType) => {
  return (
    <div>
      {showModal ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slateDark-1002 outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5">
                <h3 className="text-2xl font-semibold text-skyDark-50">
                  {title}
                </h3>
                <button
                  type="button"
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-slateDark-700 opacity-7 h-6 w-6 text-xl block py-0 rounded-full hover:text-slateDark-300">
                    x
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
