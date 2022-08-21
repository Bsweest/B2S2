import ListShort from "../components/ShareShort/ListShort"

export default function HomeScene() {
  const data = [10, 9, 8, 3];

  return (
    <ListShort isMain={true} data={data}/>
  )
}

