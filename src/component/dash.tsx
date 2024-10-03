import dbConnect from "@/lib/dbConnect"

import Image from "next/image";

async function dash() {
    await dbConnect();
  return (
    <>
    hi
    </>

  );
}

export default dash;