@extends('/widget/layout/mobileLayout.blade.php')

@require('/static/mobile/index.css')

@section('title', 'mobile page')
@section('content')

<div class="container">
    <Vswiper>
        <Item class="item">
            <div>
                klsaldflkaf1111dfa
            </div>
        </Item>
        <Item class="item">
            <div>
                klsaldflkaf222
            </div>
        </Item>
        <Item class="item">
            <div>
                klsaldflkaf333
            </div>
        </Item>
        <Item class="item">
            <div>
                klsaldflkaf444
            </div>
        </Item>
    </Vswiper>
    <div class="music">
        <audio src="" autobuffer autoloop loop controls></audio>
    </div>
</div>


@script()

var pageConfig={

}
var index = require('/static/mobile/index');

@endscript

@endsection


