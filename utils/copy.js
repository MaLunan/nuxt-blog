document.addEventListener('copy', function (event) {
    // clipboardData 对象是为通过编辑菜单、快捷菜单和快捷键执行的编辑操作所保留的，也就是你复制或者剪切内容
      let clipboardData = event.clipboardData || window.clipboardData;
      // 如果未复制或者未剪切，则return出去
      if (!clipboardData) { return; }
      // Selection 对象，表示用户选择的文本范围或光标的当前位置。
      //     声明一个变量接收 -- 用户输入的剪切或者复制的文本转化为字符串
      let text = window.getSelection().toString();
      if (text) {
        // 如果文本存在，首先取消文本的默认事件
        event.preventDefault();
        // 通过调用常clipboardData对象的 setData(format, data) 方法；来设置相关文本
   
        // setData(format, data);参数
        // format
        // 一个DOMString 表示要添加到 drag object的拖动数据的类型。
        // data
        let autor=`
        链接：${window.location.href}
        来源：写代码不如去遛狗的个人博客
        如转载文章，著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
        添加友链请按格式 主页地址：xxx，显示名称:xxx，邮箱：xxx发送到723325701@qq.com
        `
        // 一个 DOMString表示要添加到 drag object的数据。
        if(text.length>50){
          clipboardData.setData('text/plain', text +autor);
        }else{
          clipboardData.setData('text/plain', text);
        }
      }
    });

