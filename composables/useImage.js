import nothumb from "@/assets/images/nothumb.png"

export default (name, type) => {
  return name ? `${import.meta.env.VITE_API_URL}/image/${type}/${name}` : nothumb
}