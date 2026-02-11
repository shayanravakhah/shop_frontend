import Products from "@/components/Products/Products"


export default async function page({ params }: { params:{ name: string } }) {

  const { name } = await params
  return (
    <div className="w-full min-h-screen max-h-full bg-[#e9e6e6] py-24">
          <Products link={name}></Products>
    </div>
  )
}
