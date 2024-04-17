import Image from "next/image";
import { Block, Flex, Code ,Text} from '@radix-ui/themes';



export default function Home() {
  return (
    <>
      <header className="bg-black h-14">
        <p className="text-white text-center m-5  text-2xl">Incognito</p>
      </header>
      <main className="bg-slate-200 text-center min-h-screen p-8">
      <Text  size="9" className=" font-semibold text-center ">Incognito: Your Feedback, Our Priority </Text>
      
      </main>
    </>
  );
}