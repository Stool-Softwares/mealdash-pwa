import { Header } from "../components/Header";

function Provider() {
  return (
    <div className="w-full h-full flex flex-col items-start px-5 py-5">
      <Header />
      <div className="my-2 border w-full py-4 rounded-md flex items-center justify-center flex-col">
        <h2 className="text-base">Consumers</h2>
        <p className="text-5xl font-bold">0/0</p>
      </div>

      <div className="my-2 border w-full py-4 rounded-md flex items-center justify-center flex-col">
        Add Menu
      </div>
    </div>
  );
}

export { Provider };
