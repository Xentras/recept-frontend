function ImageCheck(image) {
    let imageCheckList = []
    if(image.target.files[0].size > 3000000) {
        imageCheckList.push("bilden är för stor (3MB max)")
    }

    if(image.target.files[0].type === "image/jpeg" || image.target.files[0].type === "image/png") {
        return imageCheckList
    } else {
        imageCheckList.push("får bara använda JPEG eller PNG")
    }

    return imageCheckList
}

export default ImageCheck;