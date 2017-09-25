// 按需编译，只编译用到的资源
fis.set('project.files', ['*.blade.php', 'map.json']);

// 采用 commonjs 规范支持模块化组建开发
fis.hook('commonjs', {
  packages: [

    // 短路径支持
    // 可以通过 require('/libs/alert') 依赖 `static/libs/alert.js`
    {
      name: 'libs',
      location: './static/libs'
    }
  ]
});

// 默认认为所有的资源都是静态资源，放在 /public 目录下面
fis.match('**', {
  release: '/$0',
  url: '$0'
});

// static 下面本来就是静态资源，去掉多出来的一层目录。
fis.match('/static/(**)', {
  release: '/$1',
  url: '$1'
});

fis.match('*.blade.php', {
  // 启用 blade 语法识别插件
  //
  // 1. 转换所有的 @require(path) 路径
  // 2. 识别 @script()@endscript 让内容进行 js 标准化。
  // 3. 识别 @style()@endstyle 让内容进行 css 标准化。
  // 4. 添加钩子，方便运行时加载当前模板依赖。
  preprocessor: fis.plugin('extlang', {
    type: 'blade'
  }),

  release: '/local/resources/views/$&',
  url: '$&',

  // 将资源信息写入 map.json 里面，方便运行时查找依赖。
  useMap: true
});

// 省掉 page 这个目录。
fis.match('/page/(**.blade.php)', {
  release: '/local/resources/views/$1',
  url: "$1"
});

// 配置 map.json 产出路径。
fis.match('/map.json', {
  release: '/local/resources/map/map.json',
});


fis.match('*.es6', {
  rExt: '.js',
  parser: fis.plugin('es6-babel')
});
fis.match('*.js', {
  rExt: '.js',
  parser: fis.plugin('es6-babel')
});


fis.match('*.js', {
  isMod: true
});




// vue组件本身配置
fis.match('**.vue', {
  isMod: true,
  rExt: 'js',
  useSameNameRequire: true,
  parser: fis.plugin('vue-component', {
    cssScopeFlag: 'vuec'
  })
});

// vue组件中js片段处理。
fis.match('**.vue:js', {
  parser: [
    fis.plugin('babel-6.x', {
      presets: ['es2015-loose', 'react', 'stage-3']
    }),
    fis.plugin('translate-es3ify', null, 'append')
  ]
})
 
// vue组件中产出的css处理。
fis.match('src/(vue/**.css)', {
  release: 'css/$1'
});

// static/js 下面放非模块化 js
fis.match('/static/js/*.js', {
  isMod: false,
});

// 给组件下面的 js 设置同名依赖
fis.match('/components/**.js', {
  useSameNameRequire: true
})

// 支持前端模板，支持 js 内嵌后，直接翻译成可执行的 function
fis.match('*.tmpl', {
  parser: fis.plugin('utc'),
  rExt: '.js',
  release: false
});


// 在 prod 环境下，开启各种压缩和打包。
fis
  .media('prod')

  .match('*.js', {
    optimizer: fis.plugin('uglify-js')
  })

  .match('*.css', {
    optimizer: fis.plugin('clean-css')
  })

  .match('*.png', {
    optimizer: fis.plugin('png-compressor')
  })

  // pack 相关

  // libs 目录下面的 js 打成一个
  .match('/static/libs/**.js', {
    packTo: 'pkg/lib.js'
  })

  // components 目录下面的打成一个。
  .match('/components/**.js', {
    packTo: '/pkg/components.js'
  })
