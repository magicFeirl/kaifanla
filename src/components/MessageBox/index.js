import { render, h } from 'vue'
import MessaageBox from './MessageBox.vue'

const instances = []
let seed = 0;

export default function message(message, type = 'success', duration = 3000) {
    let topOffset = 20;

    instances.forEach(vn => {
        topOffset += (vn.el.clientHeight || 0) + 16;
    })

    const container = document.createElement('div')

    const id = seed++;
    const vn = h(MessaageBox, {
        message,
        duration,
        type,
        id,
        top: topOffset,
        onClose: () => close(id),
        onDestroy: () => {
            container.remove()
        }
    })

    render(vn, container)
    document.body.appendChild(container)

    instances.push(vn)
}

function close(id) {
    const index = instances.findIndex((item) => item.props.id === id)

    if (index === -1) {
        return
    }

    const vm = instances[index];
    const removedHeight = vm.el.offsetHeight;
    instances.splice(index, 1);

    for (let i = index; i < instances.length; i++) {
        // 直接赋值组件的 top 为减去移除组件后的高度
        const pos = parseInt(instances[i].el.style['top']) - removedHeight - 16;
        // topOffset = topOffset - removedHeight - 16 同理
        instances[i].component.props.topOffset = pos;
    }
}