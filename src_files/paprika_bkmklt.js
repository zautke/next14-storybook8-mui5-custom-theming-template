function save_paprika_recipe() {
    const d = document
    if (!d.body) return
    try {
        const s = d.createElement("scr" + "ipt")
        s.setAttribute(
            "src",
            `${d.location.protocol}//www.paprikaapp.com/bookmarklet/v1/?token=3d576f11673727867d8f2785c01914449b42623e31307db56b262df49e559623&timestamp=${new Date().getTime()}`,
        )
        d.body.appendChild(s)
    } catch (e) {}
}
save_paprika_recipe()
void 0
