import nothumb from "@/assets/images/nothumb.png"

export default (name) => {
  return name ? `${import.meta.env.VITE_API_URL}/image/${name}` : nothumb
}