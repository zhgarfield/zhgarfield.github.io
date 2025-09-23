---
layout: archive
title: "Teaching"
permalink: /teaching/
author_profile: true
---

I am a dedicated and enthusiastic instructor and my teaching philosophy is grounded in my experience, interests, and passions. In the classroom I value adaptability to student needs, clear communication with consistent review, data driven insights, and a commitment to service and inclusion. My role as an instructor is to inspire students through my academic work and equip them to achieve their personal academic goals, within and beyond our classroom. 

## Courses offered
{% include base_path %}

{% assign teaching_groups = site.teaching | group_by: "venue" %}
{% for group in teaching_groups reversed %}
  <h3>{{ group.name }}</h3>
  {% for post in group.items reversed %}
    {% include archive-single.html %}
  {% endfor %}
{% endfor %}
