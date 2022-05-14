import { h, render } from 'vue'
import MessageDialog from './MessageDialog.vue'

export default function messageDialog(title, message, ok, cancel, onOk = () => { }, onCancel = () => { }, modal) {
    const ele = document.createElement('div')

    const vm = h(MessageDialog, {
        message,
        ok,
        cancel,
        title,
        modal,
        onOk: (ok) => {
            onOk(ok)
        },
        onCancel: (cancel) => {
            onCancel(cancel)
        },
        onDestroy: () => {
            ele.remove()
        }
    })

    render(vm, ele)

    document.body.appendChild(ele)
}   