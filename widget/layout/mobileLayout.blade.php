<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="yes" name="apple-touch-fullscreen">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>pumpkin's blog</title>
    <link rel="icon" href="./favicon.ico" mce_href="./favicon.ico" type="image/x-icon">
    <!-- <link rel="stylesheet" type="text/css" href="/static/css/common.css"> -->
    <!-- <script type="text/javascript" src="/static/js/mod.js"></script> -->
    <script type="text/javascript" src="/static/js/adapt.js"></script>
    @framework('/static/js/mod.js')
    @require('/static/css/common.css')
    @placeholder('styles')
</head>
<body>
<div id="app">
    @yield("content")
</div>
<script>
    window.PointerEvent = void 0;
</script>
@require('framework')
@placeholder('scripts')
</body>
</html>
