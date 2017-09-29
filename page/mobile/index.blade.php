@extends('/widget/layout/mobileLayout.blade.php')

@require('/static/mobile/index.css')

@section('title', 'mobile page')
@section('content')

<div class="container">
    <Vswiper :source="imgs">
        
    <Item>lkajsldfljadlkfj</Item>
    <Item>lkajsldfljadlkfj</Item>
    <Item>lkajsldfljadlkfj</Item>
    <Item>lkajsldfljadlkfj</Item>
    <Item>lkajsldfljadlkfj</Item>

    </Vswiper>
</div>


@script()

var pageConfig={

}
var index = require('static/mobile/index');

@endscript

@endsection


