$(() => {
    // 219970513 李浩然
    // 定义表单字段的验证规则
    const fields = [
        {
            id: 'username', // 字段的ID
            errorId: 'username_tip', // 错误消息显示元素的ID
            message: '用户名至少需要3个字符（不允许包含中文）', // 验证失败时的错误消息
            regex: /^[a-zA-Z0-9]{3,}$/ // 验证用户名的正则表达式，要求至少3个字符
        },
        {
            id: 'phone',
            errorId: 'phone_tip',
            message: '请输入正确的手机号',
            regex: /^1(3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$/ // 验证电话号码
        },
        {
            id: 'email',
            errorId: 'email_tip',
            message: '请输入有效的电子邮件地址',
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // 验证电子邮件的正则表达式
        },
        {
            id: 'password',
            errorId: 'password_tip',
            message: '密码至少为8个字符，且必须存在大小写字母和一个特殊字符',
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/ // 验证密码的正则表达式，要求至少8个字符，包含大小写字母和特殊字符
        },
        {
            id: 're_password',
            errorId: 're_password_tip',
            message: '两次输入的密码不一致',
            regex: /^.{8,}$/ // 验证重复密码的正则表达式，要求至少8个字符
        }
    ];

    // 定义一个函数，用于验证单个字段
    const validateField = ({id, errorId, message, regex}) => {
        const $input = $(`#${id}`); // 获取输入字段的jQuery对象
        const $error = $(`#${errorId}`); // 获取错误消息显示元素的jQuery对象
        // 先验证非空
        if ($input.val() !== '' && $input.val() !== null) {
            // 再验证正则
            if (!regex.test($input.val())) { // 使用正则表达式验证输入值
                $error.text(message); // 验证失败，显示错误消息
                $input.removeClass("ax-check-primary")
                $input.addClass("ax-check-error") // 失败样式
                return false;
            } else {
                $error.text(''); // 验证成功，清空错误消息
                $input.removeClass("ax-check-error")
                $input.addClass("ax-check-primary") // 成功样式
                return true;
            }
        } else {
            $error.text('请填写内容');
            $input.removeClass("ax-check-primary")
            $input.addClass("ax-check-error") // 失败样式
            return false;
        }
    };

    // 为每个字段添加失去焦点（blur）事件监听器
    fields.forEach(field => {
        $(`#${field.id}`).on('blur', () => validateField(field)); // 当字段失去焦点时进行验证
    });

    // 特殊处理重复密码字段的验证
    const validatePasswordMatch = () => {
        const $password = $('#password');
        const $rePassword = $('#re_password');
        const $error = $('#re_password_tip');
        if ($password.val() !== $rePassword.val()) {
            $error.text('两次输入的密码不一致');
            return false;
        } else {
            $error.text('');
            return true;
        }
    };

    $('#password, #re_password').on('blur', validatePasswordMatch); // 当密码或重复密码失去焦点时进行匹配验证

    // 阻止表单的默认提交行为
    $('#myForm').on('submit', (e) =>
        e.preventDefault());

    // 使用id=submit的button触发表单提交
    $('#submit').on('click', () => {
        // 将表单数据绑定到user对象上
        const user = {
            username: $('#username').val(), // 获取用户名字段的值
            phone: $('#phone').val(), // 获取电话号码字段的值
            email: $('#email').val(), // 获取电子邮件字段的值
            password: $('#password').val() // 获取密码字段的值
        };

        let isValid = true; // 初始化验证状态
        fields.forEach(field => {
            if (!validateField(field)) { // 逐个字段进行验证
                isValid = false; // 如果有字段验证失败，则设置验证状态为false
            }
        });

        if (!validatePasswordMatch()) { // 验证两次密码是否一致
            isValid = false;
        }

        // if(!validateReUsername()){
        //     isValid = false;
        // }

        if (isValid) {
            console.log(JSON.stringify(user)); // 打印user对象的信息
            alert("注册成功!")
            // 清空表单字段值
            $('#username').val('');
            $('#phone').val('');
            $('#email').val('');
            $('#password').val('');
            $('#re_password').val('');
            // 可以在这里执行表单提交
        }

    });


    // // 用户名重复校验
    // const validateReUsername = async () => {
    //     const username = $('#username').val();
    //     const username_tip = $('#username_tip').val();
    //     const {data} = await axios({
    //         method: 'get',
    //         url: 'http://localhost:8080/user',
    //         params: {username}
    //     });
    //     if (data.data > 0) {
    //         // 错误提示
    //         username_tip.text('用户名重名')
    //         username.addClass("ax-check-error") // 失败样式
    //         return false;
    //     } else {
    //         username_tip.text('')
    //         username.addClass("ax-check-primary") // 成功样式
    //         return true;
    //     }
    //
    // }
    //
    // $('#username').on('blur', validateReUsername);

});
