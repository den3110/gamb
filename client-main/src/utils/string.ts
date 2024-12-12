export const copyToClipboard = (
    text: string | number,
    cb: () => void = () => {}
) => {
    if (text) {
        let anyNavigator: any
        anyNavigator = window.navigator

        const blob: any = new Blob([`${text}`], {
            type: "text/plain",
        })

        const d = [
            new ClipboardItem({
                "text/plain": blob,
            }),
        ]
        anyNavigator.clipboard.write(d).then(
            function () {
                cb()
            },
            function () {
                console.error("Unable to write to clipboard. :-(")
            }
        )
    }
}
