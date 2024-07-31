import { FavoriteBorderOutlined } from "@mui/icons-material";


export default function LikeToggle({ exchangeId }) {
    
  return (
    <FavoriteBorderOutlined
    color="action"
    className=" right-6 bottom-16 cursor-pointer hover:scale-110 transition-transform duration-300 z-1000"
  />
  )
}
