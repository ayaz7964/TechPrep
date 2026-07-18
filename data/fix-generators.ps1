$root = "C:\Users\Ayaz Hussain\Downloads\Preparation Topics\learn\data"
$gens = Get-ChildItem $root -Recurse -Filter "gen-*.js" | Where-Object { $_.Name -ne "gen-new-categories.js" }

foreach ($g in $gens) {
  $c = Get-Content $g.FullName -Raw
  $orig = $c
  
  # Count remaining function defs to remove
  $hasR = $c -match '(?m)^function R\('
  $hasA = $c -match '(?m)^function A\('
  $hasT = $c -match '(?m)^function T\('
  $hasSvgW = $c -match '(?m)^function svgW\('
  
  if (-not ($hasR -or $hasA -or $hasT -or $hasSvgW)) {
    Write-Host "$($g.Directory.Name): clean (no dupes)" -ForegroundColor Green
    continue
  }
  
  # Remove the old function definitions properly
  # Pattern: from "function R(" to the closing "}" of the function body
  
  # Remove svgW function
  $c = $c -replace '(?s)\/\* svgW from shared helpers \*\/\s*', ''
  
  # Remove 'function svgW(' - match from 'function svgW(' to matching close brace
  while ($c -match '(?m)^function svgW\(') {
    # Find the start and end of this function
    $startIdx = $c.IndexOf("function svgW(")
    # Find the matching closing brace
    $depth = 0
    $endIdx = $startIdx
    for ($i = $startIdx; $i -lt $c.Length; $i++) {
      if ($c[$i] -eq '{') { $depth++ }
      elseif ($c[$i] -eq '}') { 
        $depth--
        if ($depth -eq 0) { $endIdx = $i; break }
      }
    }
    # Remove from start to end (inclusive)
    if ($endIdx -gt $startIdx) {
      $before = $c.Substring(0, $startIdx)
      $after = $c.Substring($endIdx + 1)
      $c = $before + $after
    }
  }
  
  # Remove comment placeholders
  $c = $c -replace '(?s)\/\* R from shared helpers \*\/\s*', ''
  $c = $c -replace '(?s)\/\* A from shared helpers \*\/\s*', ''
  $c = $c -replace '(?s)\/\* T from shared helpers \*\/\s*', ''
  
  # Remove 'function R('
  while ($c -match '(?m)^function R\(') {
    $startIdx = $c.IndexOf("function R(")
    $depth = 0
    $endIdx = $startIdx
    for ($i = $startIdx; $i -lt $c.Length; $i++) {
      if ($c[$i] -eq '{') { $depth++ }
      elseif ($c[$i] -eq '}') { 
        $depth--
        if ($depth -eq 0) { $endIdx = $i; break }
      }
    }
    if ($endIdx -gt $startIdx) {
      $c = $c.Substring(0, $startIdx) + $c.Substring($endIdx + 1)
    }
  }
  
  # Remove 'function A('
  while ($c -match '(?m)^function A\(') {
    $startIdx = $c.IndexOf("function A(")
    $depth = 0
    $endIdx = $startIdx
    for ($i = $startIdx; $i -lt $c.Length; $i++) {
      if ($c[$i] -eq '{') { $depth++ }
      elseif ($c[$i] -eq '}') { 
        $depth--
        if ($depth -eq 0) { $endIdx = $i; break }
      }
    }
    if ($endIdx -gt $startIdx) {
      $c = $c.Substring(0, $startIdx) + $c.Substring($endIdx + 1)
    }
  }
  
  # Remove 'function T('
  while ($c -match '(?m)^function T\(') {
    $startIdx = $c.IndexOf("function T(")
    $depth = 0
    $endIdx = $startIdx
    for ($i = $startIdx; $i -lt $c.Length; $i++) {
      if ($c[$i] -eq '{') { $depth++ }
      elseif ($c[$i] -eq '}') { 
        $depth--
        if ($depth -eq 0) { $endIdx = $i; break }
      }
    }
    if ($endIdx -gt $startIdx) {
      $c = $c.Substring(0, $startIdx) + $c.Substring($endIdx + 1)
    }
  }
  
  # Clean up excessive blank lines
  $c = $c -replace '(\r?\n){3,}', "`r`n`r`n"
  
  if ($c -ne $orig) {
    Set-Content $g.FullName -Value $c
    Write-Host "$($g.Directory.Name): fixed" -ForegroundColor Cyan
  }
}
