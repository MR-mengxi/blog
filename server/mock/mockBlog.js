const { Blog } = require("../models");
const Mock = require("mockjs");

const result = Mock.mock({
  "datas|20": [
    {
      title: "@ctitle",
      categoryId:{
        "_id" : "62205a84d1912e53eaf86ca1",
        "name" : "css",
        "articleCount" : 14,
        "order" : 2,
      },
      description: "@cparagraph(1,2)",
      "scanNumber|0-300": 0,
      "commentNumber|0-300": 30,
      toc: [
        { name: "概述", anchor: "article-md-title-1" },
        {
          name: "简单请求",
          anchor: "article-md-title-2",
          children: [
            { name: "简单请求的判定", anchor: "article-md-title-3" },
            { name: "简单请求的交互规范", anchor: "article-md-title-4" },
          ],
        },
        {
          name: "需要预检的请求",
          anchor: "article-md-title-5",
        },
        {
          name: "附带身份凭证的请求",
          anchor: "article-md-title-6",
        },
        {
          name: "一个额外的补充",
          anchor: "article-md-title-7",
        },
      ],
      htmlContent: `<blockquote>
            <p>阅读本文，你需要首先知道：</p><ol>
            <li>浏览器的同源策略</li>
            <li>跨域问题</li>
            <li>JSONP原理</li>
            <li>cookie原理</li>
            </ol>
            </blockquote>
            <p>JSONP并不是一个好的跨域解决方案，它至少有着下面两个严重问题：</p><ol>
            <li><strong>会打乱服务器的消息格式</strong>：JSONP要求服务器响应一段JS代码，但在非跨域的情况下，服务器又需要响应一个正常的JSON格式</li>
            <li><strong>只能完成GET请求</strong>：JSONP的原理会要求浏览器端生成一个<code>script</code>元素，而<code>script</code>元素发出的请求只能是<code>get</code>请求</li>
            </ol>
            <p>所以，CORS是一种更好的跨域解决方案。</p><h1 id="article-md-title-1">概述</h1><p><code>CORS</code>是基于<code>http1.1</code>的一种跨域解决方案，它的全称是<strong>C</strong>ross-<strong>O</strong>rigin <strong>R</strong>esource <strong>S</strong>haring，跨域资源共享。</p><p>它的总体思路是：<strong>如果浏览器要跨域访问服务器的资源，需要获得服务器的允许</strong></p><figure class="markdown-image">
                
                  <figcaption>image-20200421152122793</figcaption>
              
                </figure><p>而要知道，一个请求可以附带很多信息，从而会对服务器造成不同程度的影响</p><p>比如有的请求只是获取一些新闻，有的请求会改动服务器的数据</p><p>针对不同的请求，CORS规定了三种不同的交互模式，分别是：</p><ul>
            <li><strong>简单请求</strong></li>
            <li><strong>需要预检的请求</strong></li>
            <li><strong>附带身份凭证的请求</strong></li>
            </ul>
            <p>这三种模式从上到下层层递进，请求可以做的事越来越多，要求也越来越严格。</p><p>下面分别说明三种请求模式的具体规范。</p><h1 id="article-md-title-2">简单请求</h1><p>当浏览器端运行了一段ajax代码（无论是使用XMLHttpRequest还是fetch api），浏览器会首先判断它属于哪一种请求模式</p><h2 id="article-md-title-3">简单请求的判定</h2><p>当请求<strong>同时满足</strong>以下条件时，浏览器会认为它是一个简单请求：</p><ol>
            <li><p><strong>请求方法属于下面的一种：</strong></p><ul>
            <li>get</li>
            <li>post</li>
            <li>head</li>
            </ul>
            </li>
            <li><p><strong>请求头仅包含安全的字段，常见的安全字段如下：</strong></p><ul>
            <li><code>Accept</code></li>
            <li><code>Accept-Language</code></li>
            <li><code>Content-Language</code></li>
            <li><code>Content-Type</code></li>
            <li><code>DPR</code></li>
            <li><code>Downlink</code></li>
            <li><code>Save-Data</code></li>
            <li><code>Viewport-Width</code></li>
            <li><code>Width</code></li>
            </ul>`,
      "thumb|1": [
        "/upload/1646272462571-arw2dq.jpg",
        "/upload/1646272565599-5j0z0p.jpg",
        "/upload/1646272588196-svbczm.jpg",
        "/upload/1646272619903-a38wtd.jpg", null]
    }
  ]
}).datas;

async function test() {
  const res = await Blog.create(result);
  console.log(res);
}

test();
