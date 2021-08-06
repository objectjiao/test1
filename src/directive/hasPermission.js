/**
 * Create comment node
 *
 * @private
 * @author https://stackoverflow.com/questions/43003976/a-custom-directive-similar-to-v-if-in-vuejs#43543814
 */

import './../assets/js/jquery'
import store from "@/store";

function commentNode(el, vnode) {
    const comment = document.createComment(' ')

    Object.defineProperty(comment, 'setAttribute', {
        value: () => undefined
    })

    vnode.text = ' '
    vnode.elm = comment
    vnode.isComment = true
    vnode.context = undefined
    vnode.tag = undefined
    vnode.data.directives = undefined

    if (vnode.componentInstance) {
        vnode.componentInstance.$el = comment
    }

    if (el.parentNode) {
        el.parentNode.replaceChild(comment, el)
    }
}

const hasPermission = {
    install(Vue, options) {
        Vue.directive('can', {
            bind(el, binding, vnode) {
                let checkPermission = store.state.user.routeSingleAuth[vnode.context.$route.name] || [];
                if (!checkPermission) {
                    return;
                }
                if (checkPermission === undefined) {
                    el.disabled = true;
                    commentNode(el, vnode)
                }
                if (!checkPermission.includes(binding.value)) {
                    el.disabled = true;
                    commentNode(el, vnode)
                }
            }
        });

        Vue.directive('move-dialog', {
            inserted: function (el, binding, vnode) {
                $(el).find('.ivu-modal-header').on('mousedown.dialog.', function (e) {
                    if (e.which === 3) {
                        return false
                    }
                    let isMove = true;
                    let div_x = e.pageX - $(el).find('.ivu-modal').offset().left;
                    let div_y = e.pageY - $(el).find('.ivu-modal').offset().top;
                    $(document).mousemove(function (e) {
                        if (isMove) {
                            let obj = $(el).find('.ivu-modal');
                            let top = e.pageY - div_y;
                            let left = e.pageX - div_x;
                            if (top <= 0) {
                                top = 0
                            } else if (top >= $(document).height() - $(el).find('.ivu-modal').height()) {
                                top = $(document).height() - $(el).find('.ivu-modal').height()
                            }
                            if (left <= 0) {
                                left = 0
                            } else if (left >= $(document).width() - $(el).find('.ivu-modal').width()) {
                                left = $(document).width() - $(el).find('.ivu-modal').width()
                            }
                            obj.css({"left": left, "top": top});
                        }
                    }).mouseup(
                        function () {
                            isMove = false;
                        });
                });
            },
            unbind: function (el) {
                $(el).find('.ivu-modal-header').off('mousedown.dialog')
            }
        });

    }
};

export default hasPermission;
