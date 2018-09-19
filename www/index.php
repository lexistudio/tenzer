<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1.0,">
  <title>stylus</title>
  <link rel="stylesheet" href="/css/site.css">
  <style>
    .nav {
      display: flex;
      list-style: none;
      justify-content: center;
      padding: 100px 0;
    }
    .nav li {
      display: block;
      padding: 5px 10px;
      border: 1px solid #000;
      margin: 0 5px;
    }
    .nav a {
      display: block;
      text-decoration: none;
    }
    .nav li:hover,
    .nav li.active {
      background: #000;
    }
    .nav li:hover a,
    .nav li.active a {
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="page grid">

      <?php $get = $_GET["id"]; ?>

      <ul class="nav">
        <?php for ($i = 1; $i < 10; $i++) { ?>
          <li <?php if ($get == $i) {echo "class='active'";} ?>><a href="/?id=<?= intval($i); ?>"><?= $i; ?></a></li>
        <?php } ?>
      </ul>

    </div>

    <div class="oush"></div>
  </div>

  <footer class="foot">
    <div class="page">
      footer
    </div>
  </footer>

  <script data-main="/js/app/site.js" src="/js/require-jquery.js"></script>
</body>
</html>