<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("include/head.php") ?>
</head>

<body>
    <video autoplay loop muted poster="public/img/tourists.jpg" id="background">
        <source src="public/img/tourists.mp4" type="video/mp4">
    </video>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <!-- Hero container -->
        <?php include("include/hero.php") ?>
      </div>
    </div>

    <!-- Data display container -->
    <?php include("include/nytdata.php") ?>

    <!-- Data display container -->
    <?php include("include/modal.php") ?>

    <!-- Document scripts -->
    <?php include("include/scripts.php") ?>
  </div>
</body>
</html>
