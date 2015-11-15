---
layout: page
title: "Resources"
subtitle:  ""
permalink: /resources-by-brian-williams/
---

<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>


{% capture img %}
  <img class="img--placeholder" src="{{ site.img }}{{ site.placeholder }}" alt="" />
{% endcapture %}

<div class="work">
<h3 class="txt--lite gamma">Download free resources:</h3>
  {% assign num = 7 %}
  {% for hldr in (1..num) %}
    {{ img | kramdown }}
  {% endfor %}
</div>