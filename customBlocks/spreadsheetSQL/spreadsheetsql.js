/*
Author: Chung-Yi Fu (Kaohsiung, Taiwan)   https://www.facebook.com/francefu
*/

+(function (window, document) {

  'use strict';
  
  // 載入參考答案按鈕的圖示（base64 內嵌，不需另外放圖檔）
  var spreadsheetsql_icon_import = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAvCAYAAACc5fiSAAACuUlEQVR42u3Zb0gTYRwH8O/dhGyjV1lbTjM7XTQ5rZDQykGpkRFFwSgGaUQYkYhhQpgvgnyZERVGvYhcmIFaiIQpDvRQZw3BLf/UZOZaWUJv1LWsF7vetDDZblue3tO436txz3PHhx+/53fP7gHkkCO2gwo1kFls2A5AI6Htp8PM9UcMzyw25AK4BWA3AYmdB3DHYeauLh1QLEFnJyZoXs37vFpCKmINgDx1Vop6xu5+sXiAXjLRNP31C3H1rIpXXsgsNuQLwTNIXIjfFnwAsHfxtTihGxpq7mJHOisJ9n5bA+qfPQw5Tv+v7VCGr3bEifUgbtgK16f3gnPysw3YrE4iCz7udgouJgDYqWNFg8s1LsNleCy1Qz/P4+VgN2of3QzsIyKKktqyP79ZRo/r564gNTFl9TJOUxQO5RSguuQSVPHKqO9nGT2una36Z/SySoWmKBzOLYwaH0CnJW2VrsZpikJRTj4umy5GhGcZPapPVywbLcriVNAKHMsrCosPoPWp28jpKuHwYqNFbYcBfLmx9C+8LplBlalMVLSom6wA3njgKADgdvMDaDdsQs2ZSmSlZZC7rQ2G1yUzK4JeEXgAf6rguPzKjzrjN5rqsW6tKuS4Ml6JipPnkbwxuu9H3bZetPa0C84J931HEP7GNRYWYSo8ERXcz/OY+DiJgRGbtKUyOvUOfp6PeL7X58WEZ1L6Gm/v64T784eIs83ZrbAMcdLDnR4XHnc2Y9Y7F3bu2yknnnY/J6cdtva0w7fgQ7mxFIkJmqCZfj02hLqmejg9LrL6eMegBQMjNhzZcxD7d+0Do92C7z8WMD7lRFtfB7hhK7kvoFnvHBq7WtDY1SL/54x5+CiJyN/b5H4h+JNgXQHSn0jcc5g5S8jDqxm7e1qZvr4LAAtAS8ipW53DzFUiVs455Vjt+AXUONVRZTT++QAAAABJRU5ErkJggg==";
  var spreadsheetsql_icon_blockly = "data:image/png;base64,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";
  var spreadsheetsql_icon_scratch = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAe60lEQVR42s17eXiMV/v/55zzzExWIYhsIpYKEYLYt6BULa11UNpS3mrpgqou32pHWtWqpVpvq29La6kiU6r2ohiltHYqliASIhJJZJ/lec65f3/M2Pp2xfv+3nNdzzWTazLnmftz7u1z3/cD3OVau+NAtQB/i/eP5GSNiNjd7pk0ZoyJAXjvk9Vt4xI6ljdrmbzLZDIBAMf/wrou5Pr1e2q1ad8tt058l/WjpyxuKHyi22y2u/ihyRoAdLXaWjVJ7JS37rUwGtC9VcmoGScjb733vVra3Xx56X4Pq65dqzqpd3bv2d/N79K8x4S3ft70/hzGmMe3t/GrrzCbzcYAIC0tjcXHx7O0tEZkt58gmw1ISdnJTcJhPPyPd/qe+SF18eejroS0aAVj0y8lwZtSZzRiwOXBgwdzAPJ/RRPM7Vq2zaBVNYwri8PUcwPiKbH1oJ9fmWlvbfZCy6xWq7BarQKAuA2JW95fVxeNA/cPfm14xzZtKW1eDaJ1EZLWh+uLJ8ZSVFyvNzm7qSH3at2NOjGT2UzxCe33p4481aJ+PSahDFq3V9Nm74jVr6j4qaf2fjaDMSYBwKQBmjkAs5ZdrPne+58FZWacDxzUJ6l2Xn6Be5f94LlJH4ylNV/Z20ca+z5d+tRlVStSg6cU3BwMefwMxJOrkw7s+2FdG8aYAkD/CwBogsOIaXD/ypUjzgxu2Ug39FKumUJIFeYb/K01IfjmZMz++KT7Xzt/4UqIM+9s95gwtKvqV1o7gJcEBmhu+Af7QxoSFWVulKtqIFmG+Y9dQfWqGskKYkIAYCCXh1j3OTWuJQ2fWmfuhH7FAANj9waEu1anqJp19Nzis4AAOCfIEvDQIBO9P6ZU9dp7quW87QVb+kTo6NCxFIk1PYisLGHx54CJEVCgwBhAXFBZIZiJK3DBlNMnPAApwfwqkYoNdYV8983Ohmxi/73x8VYzYPfcCwDu2FsnJydDKqBC187klpkBKBAAIQAyiMliLrq3JLV2Yo6aNSJf9uukG7WjuLKYzaR0AVnOmSw3C1mmCVnOwYQZUIKTDsZ9v4oAGApQ4HgwwcWyzp2YsTh1a0xamt2D5HvjC+4iXHUGAFj8q1zKKTYBdFMjGQMEB2Q5OEnBZbkQRgnTlBuciBj3fS44+V5xw6zZdaMk73tLFQ4uFR/+oAtfP5necdb0GT+NeXlBJ7HLYdwLh3jHAISFpREAuMh0NqdYI0gw9iuXwhkgFSAEgyYYiG7D6Q+iC0ACkCDMXubEmE+qYOzcQFZeWigXDj0anr5n8dZej01/RBMOIznZpv1/ASA+Pp4AQOpBFy8WQpKHCcFvEY8AJgAthIOkByQ9ECEM3I9D/kkUJwAwAU99qiGr5jSMn/s9Hk3ZhJ30hnhnU6ia3OG42cha+1XywNcH7nKkGL4w+98Pgwyg4ZO+Czzx3aST+14rqGk2Q5ECBwFMAyo8BNtyAxnlsWAcqKFlYWw3A43i/SGLlU/1b19KATxQYM+BEsw9MxL2ZR/c9vm2PSfx5uQn1YsdTmDOnnh3VOKQjl/NH3/IZrOxlJQU9V+NAgRg5Yd9yhs3aVeWV5KP6BoMJL2wSgY8+k8zmjz8Hj4ePQBKKWx37MeTc+diyPEfMH5I4G+CoABwE+FwJkenzh2hlIIhJTQhIKVEt/YNUWn+l3zK2IflpM4Z/s+vts8lok6MMfZfNQGr1coBYNQLnyRauDMmwF8pSDBFAA8S+MZRjpAmIzF18mMICw1EeLVgDBvYFVu3rMK2ilGYvrgCojKHVL+nXgxKERjj4IyDcw6TyQSPR0erxFg8/OQM8eNJtzE0qbBDvfbPDQYgk+8gMtwxAHa7nfwsJji2rllo65EdGFpdkDR8JsUUfsrww4C+vSClgmEYICIYhkSgvwnrVszG1qL+WLO1HKLS7SAwAFAMtasZOHc2Hb8+V7PZBAB49omeOMO6sybVrpBfRdqzRCQcDof6rwDgczqqWY9JT3SKOpfUo60uZQmE4NcFUHArPwQFB0MI7+kxxqBpAoYhIQ0Diz6dgdmO2ii7poNrN9M6zgA4CW3iTDhzeAdcHgnOGZTyypZfUIiP5i9A0bVr6NrnUZGd70bHumUdOgz5PAGA+rsOkd8JFbbb7YqIAoyrR9+Y0KWAoLQbFkjwZkMhlnLk5uaBiEC3BAdNExCahlrR1dCu1yh8td0JFnRTCxgDpK4QGu2PJoFHsHjFFnDO4fboAIB33vsIz457Em/P+BDJHVsjs6SKbBVdgLMndvQgm43b8/LYfwoADiRrgwdPNQGgzlZb79YR2bEN6yslK4hzdosKE0OTSDf27N4LxthtIGRdzMbEF6fg1Kl0DB/aD47zoYBu3M4OGaAqCBP7Al/MexOX84rg72eBlAoNGtRBaGg46tWthdAqwSg1gpAYUYzoKnon8/S3FBwO9mf1iOTkZO2uahYmjaNxm/4btrwRpWhjhG6sjCCyey9ljyC1OpKKllajzu1aU8G1UpJSktvjISKi8S9OJQDUq99jZBCRtWcHci+rSrQqipQ9goyV3suzPIJoQzR981IVatHRSgVF5XR9XcjMIiKiA8czacSDcaroq3oqrkGLnJbJA1sIwX73cH3mcZuG/BV7YWazGT0fHjavUpWIIUOsA67t3rP72saVH82Z0CXXX5BgnN30VQyAkoB/NTPyM7NhP1QJD/VoB13XoWleJ71//3GMGDEMLZonYu3XK9A7LhsmP3+AAO5P4H4EYWKArtCgiQUR+kk8N/Mn1KxdH3VjI1E5JAQA8NLLb6BLr6GszdCZqN+gUXBRYfFoYoFxTz4z7pjj+y0FSUljTPXrB/HMzEwGgNLS0sikCTzQa9grXTt3Mx08uO/CX7EXRkQYPnJCYkFB4WipO3vl5lfIaMv5ehtfvsZgYlBl3iT4Vo8tCeB+HL1eL4N18pcYNbwPiAiMMZSVOxEU6I+LV4ox8dEOsD+TA1XhhDBz7DhVBSv3mpBTCuiSwSwISbU56lXOxdqMRFClpqhdqzpOns5ATK0YzJ09FWAM3Od+dv94kM15f35BzcjQIR9+OPP7W3wXHzp8XL+MzEsvM8ZEv/7dRr866flj7A6coF/yA4/MceccfDoqRKoBrQ0xvIvHm8G42Q0FI+IAruFa5FgMeCsfPbu1xOQXxoLzm5o5bvwU1KsVhhfGdIZxYTt44V7EPHoQ2RcFEKgBhgQ0AZSXYsrEB/HWnDk4eOQisi5koHZsDJo2TbhBHqRSIAI0TeiXL+eaBgx58lpIsPnxatVrNNV1o11+3tUGimkVEeHVP1218tMPdd3Ar87sj5fNZuOLFu00Z2Y6XF37vjB9fMKaVxPqOo3Xl/prFTrwzjA34sIVYACMC8BTCIqbCNZ8GpwuFya/8hYuXcxG40YNERgUiMNHjqFS5cr4eN670ASH8tnj/H8txrhxLwF+/jAHBoBzDlfuFazbvAq9eiTfZthKqdsAJSIopUBEatRTk/lP+w7gvnqx6y1+foebNW744zvvvLa5osJ1ozb5N1NnYsnJyX47bDat1+AXPrW/VIdoaw2dNobToudjaNKA2kTfRpCyRxMtr0T0fW8iIlJSv+G8MjKyaMXKb2jB58to308HiYhISklKGkRK974S0Zq1m6hJs64EUxQBVWjEkxOJlCQpDZJSkmF4X39vSSkVEclhjz1TlLpjR9BvOMK7I0OtHnzuxafjNs18om+JgVKuoTIBFQwo5V7fK13A/VuAqkkASRA4lFIQ4vd9rlIKShEUKZhNJng8Huz64Ue43R707tXdR6XJWyMDQfDfj2KGIaFpQr05bS63TZ12f3KHhB+Dg4N5aWmpBwA6d+6srp++9lcSH8YYvfKKrc7BY6f7mDWVt//0OcsuztH4uMZy8wROZnPkFHNMH6rDYpQC1dp4hfdxYgZA+MgMAJw7fwGTX56KpomJ6NihJZKaN0GVKlXglUn4Ul4zut3f+TbqyW6LNX9EUxkOHTmOq1fzqXKwX77D4XDd+rnD4fjrbHDq1KkMAIWEVA32Dwh88PTJNE94cEjI9+mV4Xa6eNUQgdqhCkPa6jBrDOTygFVr40NPennxrXFXCOze8zOioyPRoGF9LFu+Gh9//AUqVa6MmtGRiI2NRkxMFMLDwxDgHwCzyYSAAD8YUsHtdqOoqBjFxcVo3SoJZrP5tw4MQnDs+XE/W71mA2uU2DI1KLDzYZfbmZmTnZPlHxAU2LFTy7R/zp2+wWaz8TsygeAgf9Rt3OvrD3rtG9ipqzRQBM0bBTTAXQgkzQbingbIuA0AKSWEEFi0ZCUKCgswacI4AIDL5caZ9PM4eSod6WfP48qVXJRVOOFx6yAJCMGhyGselSoF4vChI5g48WkMGzLwBlW+FQDGmNJ1yXo+NDwrqVmi7eiJk7XLS0qrBYdUitA0jdWMqr54/rwZ3w6yWoX2N4snIj7eytPS7Hr4fR3fTNmY2X9d3QvQNDMJIubNwgiQ5b9TuvfiHRoaisNHT0BKCcOQ8POzoEnjhmjSuOFv3lhKBcYZuM8EHnn8WcQ3aOBLm/mv/ldC0zT12edfaenpZxd+/93KxX/AaCX/m/UPIy3N7rFarfz7ryYeyxVN3p++rqpmDjEMRT7hGQeKT/iEvX3764QhoVEc0s9mQAgBk0m7Eb6uAyKlvB7OfGbDIQ2v//j4X0sRFBiApomNIKW6sed1oDRNU5eyr4glS1MLXnlx0D+Tk5O1pDFjTL4CqgbcJQ+4pUEpiMgSm9Bn9xfP1yTaWsPjWRFJlBpGtKYekauASEkikr8OUURENGDIk7Rt+24iInK7PX8U0sjj4xE/HzhMLdv3obyrBd7wqdSN/zMMSUSkDMPQBwwZQy3bdO/POcfd1Av/NDECgB079kXXS+xxbvmkKKJtNTyGvSbJL/2Jjk3zSeD5N4GUUnTg4FFq1ronXbyUc5sQum6QrhtkGMZt39uwcSs1b9ODDh355TYglVKk6zoRkayocBrDRjxHEbUSJ5g08Ve5zt2DsPybHbF1E3ocnzO6JtGGMJ3WRCp9eXVSubt/FwQioq+/2UQt2/ehxUtWUklJyW9qwIGDR2jsuJfogd7D6PSZ8zeA8gpuEBEpItKPHT9JPfuOoJr1Wk2weKtG2n+6Knwjs7Lb7ZKIghu3G7ayZZWjPW39ClCrpgQ8gZCtloOFtwUjAoPy+ggwSKkgBMe58xfwwbwFuJh1EVWqhCA8PAIMQGHxNVzNzYfF4ocHe3TBY49aAQAeXYcmBDjnBECWlZVpny1cjqVfrboSHhH+7PZNX61ye3Rxpy10dicDCFZrqgDAAvw4Hnlm9hOJzTvnvzE8VuYsDFO0qQZR5qdEpMggIl0RGYZBShrXVZeIiIpLSmnfTwdo9Tcb6evVG2inYzddyLx0qzIon0PRicjIzs6h+Z8soY5d+5c1atJl3rZte2v4goS4s76AzcZxkxz8ZQSva0CAn4bkoe90vXbu4MgAXOpbWpgdXNlfQ6NonQ1tWYhmLdvCnPQ0ENoNQNDtaTDRjRDnq4xfjzp0awi+lH0FBw4ewa4f9uHnnw9dcrs9a1olNfvgs89mntV1CcAqALu8EwAYALJareLMmbzgY8ccRURgf96HT9YYHMa1oqLQRu2emNYs7OLYpzpcQZeGbgSGCJSXMXy1y4wpq/zRNKoYsVUNxDWMQ0Kz9qjZoA2qRTVAQEgNmP0CYDJpMCTB5TbgdFaguKQUV/MKcCY9A6dPn8G585nyUtal9MtXrmxvcF+9nZs2rdhsMolSw1DwRSTFGPvbLXNmtVrF11/bZddeQzpLD5tbNTQk6siRgzMyzx2eZRjyjzRBaBwyqdcLHfLS938+tuOl+yb2LJVagAmoYEJJ8lZ4KxMGvhmAqQMM5JYzHDjlQVaeCyVOAReC4EQoNEsQClwWGCLEHeiHTE2Yg5zOiqyC/ML0Kzk5p4IrBZ9MTGqa9m3qwgzBmUfRzQOw2W4SmzttjbEZMxYEbd+188zCT2eHR0WG4eXX3sWSpcvHXc0+Pn/AwEHCbv83teJmE1NNu457VeT98OacR65qbRKVgRKhSUXgHNANwFyd8PUWM1J/0pD6coUXSosASAM8gHJJlJR7QFCUnqPooY8iXK07dH9i+9r5qYYEDMPjZYGKbqiiz0eZTRpzG/LetMdp3cZv+/R+sEt4VGSYrpRSb0190UhIaDz34UFPJdjtdnl75mTjZpNQ9ZIefaue2jl90+Qrok08lHGNa4D31JUCzNUIW/dqeHetGe8Od0N5AKNCwChwQ+blQRXngRvFqFzJjCqVLKxVgj9rE1MekH5879I+j9v6uN1uSBnj17FjJz/yOmfetvfzkzp06H6wW8dOJ5p2emI+EQXcbTTjAJB5ISMirkFdAsAMw+Bmk8amvj7BfPbc2QVEJFJSdnIiYt6sKkUNGDWtf4OgtClLnrqih/hrkGXgmvBlwhogKhFmrbDgTbsflk9wok6EBDwaNKqAFhQB0XIWeNtPgMheIFcJSOooLwGr5M9pyYhMc9aBb9Z0H/rWiADLRZfD4XARUVhc8/4bW5g3z1r06C/NVow5Xbd/zK6nE9s8lEpE2t0AoAFAaWmZ9PezMNzk7aJ92xbG0EH9Wrds2+slxhzvdO7cWXM4vHfa/+OuHgsG5ykRaGJGMTFN+Pr+GlDoZBg3zx9+JsKW18vhbyGoCgEOJ+AfAXReCwTFeu9e53HQha/Bjo/HhUsKpS7GWjZltCw4k49fsWZRdNPHk9p06PZ1vaa9P3qhXVrCuL4VOtxCgDT6v8Gl+OHtsw/GNJgaxoDLhL/itH9HA6Kjo1VuXsGN4QTOACkNMXnyM7JWbK2pDz00tPUuh8No08ZtAgC30+Um4gzyZlWRvFkExnzih64NJRa/4IQ/B5STw5uzENDmE6/wyuOtFZABFTsIrO0sfLtfomMcQRnEatfQkDo2S41L/OE5OjHX8e4DxxLG9XVKWayZpAvc0Im7Sxj3INDdITnJQ9d/+J2agCUg+NCBA0e97JJ5i5pMaMxEpWzW28+bL1112dt2eyZy3759TgJE9bqJB9YfD2Dg6t9HQgiIj5KAAqQOcMEBvRiIGQSEdfTWCLjZOz0BDq4kXIE9sSejqhqdXEHk5JA6MT+TiY/vVyaXPJWpBnUylCrmQnCCUoAWqoyPtlrYJXftZasXDcgHwHEHIfAGAAf2bjxy4PDRvLy8PAghFF07Br6zH+T61jw2a5ia1ju95rkzP23r/4/Zbcwa5KHN76f+eDEi/+IFJYSFkbrpojHrMRfGf+mHzGwO7kdQxABlAJUb3zr/4a3dKQLnAus2/YhDF4ifyxNMBClFYJAGwSjlQukmLiuYN+9VDKbqSl+1WZgWHo5P37H2gwluj3FX6bxITk7WRo8e5Y6ueZ+luMR1f6cOrQxjax8h8nd7TaGkiNWvVaHa1HKGrdt5/gkZ0rbKwfPXMgJCanquZKV3Sm5WLqWTc8EBZTCE1iCEmoF5m8wY1EmH8jBvPuDJB2KHeU+fvBNlDCCn00WTJttknQZNxyzY5m5VQysOTrhPN7iZE1feKiAXDDwAipsM9eEqi+nD/S0ypk+f0rNl8/hcm83G76QtflvuzxhjROTXtG3fXTNftSZ1D5mq6zlOkyYYGCdICYhApcqLFV/5UyC+SwumfFnz4qETuTFbX8hGiyZeLTdpvqEoP2DwHH+82d+NBrUllEcD14uAqN5Auy8AzR/S0CE0kzHFNkvbsOn7V48d2PzuWx8sa7Bi2eoFbWqcbj+ibSESogwEWwjlHuCXyxo+dVTF0bJmWzZtmPl4eHB4rs1m43eTBN2In9c3stnejVm++rvv33k4q96ATsU6Ksya4SbGGHxdFxACSaJcaRl5hJ8zLHh/kx9SJ1YgJlJBlnh9gKimMG5uAIa21tGpqQHlZOBceOuFNTpBtVsM7h8mP12wVHz40ZLNvxze2ouxFhpwUCci3vOxaY8UZx4ZWYnlJAYFGgEVTs2d76p6LLhm4sL9m2Z9WVrmwr0Q/rYE4jqpsb27OGbp0qUrBiZktX3ugWLUjIQEMcDDGTzEPJIxzkCaCUCQYlv2mTBznRlTh7jRPs4ABLBkqxmzN5lxdFY5yO2lN15dNkFWXIWo3UotOdSFTZqz8/TVjB3NGGO6zWYjALgulMWsYVu6XmX5uguWbl1j9UeamQvcbv22Uv09nxW+jioRmeu1HP58sH72ufsblMQ80LAcjaPciKjCAPOt490Ml3I4+s0MgJkBdSIU3C7AYvFOeIZXVpg72gW4GZQBcA4oCHDmpLOXXRi9qE5pttbsuUuHv1zi1tX18XpmtVq53W6nW5ghAHCr1cp+Iy2/x8PSPlrMGfCvTb+EvjguJbmaf/mgmKpGZ03PDg4P1v2qBpJR5IZ/UamB/BKBSX3c6NdKx6kLAhoH6sVKgAFPz/fHtXJOXz5fLk2MCekBExxQxMEDGOUXeNiIz6KA2r2nbF/x9tsunW57xuDW2sS9OvG/VBG6rmLMy9VFtepVJRHh2/zCKi8OnP1AYXbapNIrh1v8o10+vdxX8qBgBSpnYL4nZ/QKr+cWNQ05/h2LOJARgHWvFCM0iJF0ggkNXsfqx+haiS5HLozSSkK7Tdm3fs7bLk9HjWin/E8J/KcA+ITHgVOnqj49ZurMMC23v9NgFVrIfT8aFdcqBxunWvRsdC1kWDudKlUHQynzCsO93WwA0IKhpNPA/G2BfN3p2HxPYMJaz6Wdjy8be1WLjeLKKAPXroNgYVRa4ZEjF0RpGbzdlJOOT9526XTH/P4eaECyxtkuo05Cz9lPJJ19YWz3ApSXChy84IewYIlW9+kQQZzgZMzQvYIrXyLOA6DAJLYfFnzutjBc8DT+csJrr9ue7ht3PqHrhIf8i/at+tfw81pCfUFGiRcEJQFuYVTh1uWIT8K0XTlxtoqs9W+WVXjYnU5/3q0JcMa5uq9es727X7ncsnoNRvCAw08pKMbgZFxKr20SAE2AEEAKBvGfTgv2yc4QHLhS58fw+u3+b8/qNxxOtwTi483iZJpnyLhZfdJ/Xrv6o8GnTS0TuDKKvSxSKYCbGQxlGM8uCtU2ZjZelnU0dSRjzACSTMDBWx0iA5KZ1RpGqampd60lv9khEYyBmfzKc4u5gCQmPcRlCdNUGQSImGCAsABakKIKj2Qb9prE4PdD2GOL6u/dX3r/wAuntrfftvw1h9Mthc1m40hL8zRtnmRa8fGL6zv1eaL/6C/rlu89SlyrTMqQvuigEzTStE+eKjRGJhwYXjvx4e1nz54NE/ygzhkMP4tJ+fuZlSaY5HAYdrvd5yfurvHBfmuE7IddDiM6ceC01zsefu0fvcsNo5hrGr85yg4NOHOZ0fJ9gWxXenBpjjt6SzEP+6AobckPTpcHt4Qy+avNNeZwGO36T0y8eHTXxi+eyIns2lJJo4iJ65SaGMCDlfHZerP2niPufNWq0d8WFOYExkRUi+Oa0EpKyjNLXTyzjIL37dm2cHetyqyQYOPAnZkK+61mR0pKirI+tzC+9PC8I+vGZwsOE+c+EmMoQAtRcuw/K/H1Ofcve27soy+/MS75sscjQbckVH8wpKfB4TCGjH234QHH5m2z+52J7JssDeMa17Trj8koQFQi9cMBzjPyLYiprmDmHmgccEmBnGINe89bsCczPAvBdZ4+uP2LTW/co8zwel4oBGe4r/mApUsm1CL6roaur/DOAcrUCKK1EfLY7HBq3bbbKV9ZSvs7Dy4kJ9s0BmDx6p0NGyX1Tl80Pppocw3dSI0kleq7z8oI72Nzm2rotCFcpw0RhvcK12ljuE6bw/RfPgijNknNXSMnzmvsm/vh98QH2GzxJBXxF1+Z+Nq8PbHFF84prgVCSekrljjBGyco+WDdrLi4tqPGMMAAdv7lmzocKcYgq1WMGND55LKFH7R/a2fTn+auDtREsKGTj3dwDqgKcKOEa7KMabIMQpVDyDKmyVKmuQqF1iiBeUa1K7KsWrqyC2eglJ077w0AKSkpymq1sqcHd8wKr995zFPLonl5ma6EPyPdl6cpt8Cg5mVU1XR1kCJif5eS2u12abWmiqZN6+WdPbKux8cHkza//HmQifspg2ne+/x6Q0W+agIBJsEADWQowOOskAwAHPfweQG73S47JSdrm1ekpPLo7tOG/ytay72mM1NVkkJj4AGMLJoOknrwnU6d2+2Dpc1m44yx4uwTa3ouO9lswciPq2hlHp2ZqiqpVVJSCyEpKnkvLYSkFqKkCFYE7sH6rSbLx47KVwc82m+LJDCbrbO614/MMCBZ+Ft2G/XbjnrKUnTo/fHd8vw7xjlxqVDgve8ikSnjHzviWPbloD9zfn/SZU5JSUFggFlFJFjfqMVPvJ7coEyLDFYwC4VAi/foKzwMRW6Bs3kazhVUcp7IrbI1LqHxq5vts9PulB7/1XIS1zhU8uA3m50+svfVxFqsd24RsizVGsw89P0/P69wuu+enhIxMAazBmrRf1rT82ln2xUW5Pg1iY9tYhhuC+cMbrcsvXS16GRAYFRG74EPpi+bPuiE06UDdxEG/x8Zl5ILKUJHZwAAAABJRU5ErkJggg==";

  var spreadsheetsql_response = {};
  var spreadsheetsql_head_response = {};
  var spreadsheetsql_id = {};
  var spreadsheetsql_name = {};
  
  function spreadsheetsql_settings(spreadsheetid, spreadsheetname, task_id) {
    spreadsheetsql_id[task_id] = spreadsheetid;
    spreadsheetsql_name[task_id] = spreadsheetname;
  }
  
  function spreadsheetsql_executeSql(spreadsheet_sql, task_id) {
	//google.load("visualization", "1", {packages:["corechart"]});
    //var input_url="https://docs.google.com/spreadsheets/d/"+spreadsheetsql_id[task_id]+"/gviz/tq?tqx=out:json&sheet="+spreadsheetsql_name+"&tq="+spreadsheet_sql;
    google.load('visualization', '1', {
	  packages: ['corechart'],
	  callback: function () {
		var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/"+spreadsheetsql_id[task_id]+"/gviz/tq?tqx=out:json&sheet="+spreadsheetsql_name[task_id]);
		query.setQuery(spreadsheet_sql);
		query.send(eval("spreadsheetsql_QueryResponse_"+task_id));
	  }
	});
  }
  
  function spreadsheetsql_QueryResponse(res, task_id) {
	  spreadsheetsql_response[task_id] = [];
	  spreadsheetsql_head_response[task_id] = [];
	  var arr = []; 	  
	  if (res.DY=="error") {
		  if (typeof eval("spreadsheetsql_getDataFinish_"+task_id) === 'function') eval("spreadsheetsql_getDataFinish_"+task_id+"()");
		  return;
	  }
	  if (res.Ta.bf.length>0) {
		  for (var i=0;i<res.Ta.bf.length;i++) {
			  if (res.Ta.bf[i].label)
				arr.push("<font color='#AE0000'>"+res.Ta.bf[i].label+"</font>");
			  else
				arr.push("<font color='#AE0000'>Column_"+(i+1)+"</font>");
		  }
		  spreadsheetsql_head_response[task_id].push(arr);
		  arr = [];
	  }
	  if (res.Ta.Wf.length>0) {
		  for (var i=0;i<res.Ta.Wf.length;i++) {
			  for (var j=0;j<res.Ta.Wf[i].c.length;j++) {
				if (res.Ta.Wf[i].c[j]) {
					if (res.Ta.Wf[i].c[j].v!==undefined) {
						arr.push((res.Ta.Wf[i].c[j].f!==undefined)?res.Ta.Wf[i].c[j].f:res.Ta.Wf[i].c[j].v);
					}
					else
						arr.push("");
				}
				else
					arr.push("");
			  }
			  spreadsheetsql_response[task_id].push(arr);
			  arr = [];
		  }
	  } 
	  if (typeof eval("spreadsheetsql_getDataFinish_"+task_id) === 'function') eval("spreadsheetsql_getDataFinish_"+task_id+"()");
	  //console.log(spreadsheetsql_response[task_id]);
	  //console.log(spreadsheetsql_head_response[task_id]);
  }

  function spreadsheetsql_getData(task_id) {
	  return spreadsheetsql_response[task_id];
  }
  
  function spreadsheetsql_getCell(col, row, task_id) {
	  if (row<=spreadsheetsql_response[task_id].length) {
		  if (col<=spreadsheetsql_response[task_id][0].length) {
			return spreadsheetsql_response[task_id][row-1][col-1];
		  }
	  }
	  return "";
  }  
  
  function spreadsheetsql_getDataTable(input_id, input_width, input_fontsize, input_left, input_top, input_column, task_id) {
	if (document.getElementById("gametable_"+input_id))
		document.getElementById("gametable_"+input_id).parentNode.removeChild(document.getElementById("gametable_"+input_id));
		
	if (spreadsheetsql_response[task_id].length>0) {
		var obj = document.createElement('table');
		obj.id = "gametable_"+input_id;
		obj.style.position = "absolute";
		obj.style.width = input_width + 'px';
		obj.style.left = input_left + 'px';
		obj.style.top = input_top + 'px';
		obj.style.fontSize = input_fontsize + "px";
		obj.style.border = "1px solid black";
		obj.style.borderCollapse = "collapse";
		obj.style.zIndex = 9999;
		
		var innerData = "";
	  
		var k = 0;
		if (input_column) {
			for (var i=0;i<spreadsheetsql_head_response[task_id].length;i++) {
				k++;
				innerData += "<tr style='border:1px solid black;border-collapse: collapse;'>";
				for (var j=0;j<spreadsheetsql_head_response[task_id][i].length;j++) {
					innerData += "<td id='gametable_td_"+input_id+"_"+i+"_"+j+"' style='border:1px solid black;border-collapse: collapse;' onclick='javascript:onclickid_set(this);'>"+spreadsheetsql_head_response[task_id][i][j]+"</td>";
				}
				innerData += "</tr>";
			}
		}
		for (var i=0;i<spreadsheetsql_response[task_id].length;i++) {
			innerData += "<tr style='border:1px solid black;border-collapse: collapse;'>";
			for (var j=0;j<spreadsheetsql_response[task_id][i].length;j++) {
				innerData += "<td id='gametable_td_"+input_id+"_"+(i+k)+"_"+j+"' style='border:1px solid black;border-collapse: collapse;' onclick='javascript:onclickid_set(this);'>"+spreadsheetsql_response[task_id][i][j]+"</td>";
			}
			innerData += "</tr>";
		}
        
		obj.innerHTML = innerData;
		document.body.appendChild(obj);  
	}
  }

  // 放進 HTML 屬性值前先跳脫，避免題目內容中的 ' " < > & 破壞標籤
  function spreadsheetsql_escapeAttr(text) {
	return String(text)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
  }

  // 參考答案路徑：exam/answer/組別/題目_Blockly.xml、exam/answer/組別/題目_Scratch.xml
  function spreadsheetsql_answerPath(group, title, platform) {
	return "exam/answer/" + encodeURIComponent(String(group).trim()) + "/" + encodeURIComponent(String(title).trim() + "_" + platform + ".xml");
  }

  function spreadsheetsql_getQuestionsList(div_id, task_id, input_column) {
	var div = document.getElementById(div_id);
	div.innerHTML = "";
	if (spreadsheetsql_response[task_id].length>0) {
		var innerData = "<table id='importQuestionTable'>";

		// 欄位顯示順序：名稱(C) | 分類(B) | 序號(A)，與離線版題庫一致
		// 數字是試算表欄位索引：0=A 題號、1=B 組別、2=C 題目名稱
		var colOrder = [0, 2, 1, null];

		var k = 0;
		if (input_column) {
			for (var i=0;i<spreadsheetsql_head_response[task_id].length;i++) {
				k++;
				innerData += "<tr>";
                for (var c=0;c<colOrder.length;c++) {
					var j = colOrder[c];
					if (!spreadsheetsql_head_response[task_id][i][j])
						spreadsheetsql_head_response[task_id][i][j] = "";
					innerData += "<td id='"+task_id+"_"+i+"_"+j+"' style='font-size: 16px;text-align:center'>"+String(spreadsheetsql_head_response[task_id][i][j]).replace(/\n/g,'<br>')+"</td>";
				}
				innerData += "</tr>";
			}
		}
		for (var i=0;i<spreadsheetsql_response[task_id].length;i++) {
			var row = spreadsheetsql_response[task_id][i];
			for (var j=0;j<4;j++) {
				if (row[j]===undefined || row[j]===null)
					row[j] = "";
			}
			// A:題號  B:組別  C:題目名稱  D:題目內容  E 之後:評測資料
			var title = row[1]+" ["+row[0]+"] ："+row[2]+"\n\n"+row[3]+'\n\n\n'+Blockly.Msg["TEST_DATA"]+'\n{"data":["'+(row.slice(4).join('","')+'"').replace(/,""/g, "")+']}';
			innerData += "<tr>";
			colOrder = [null, 2, 1, 0];
            for (var c=0;c<colOrder.length;c++) {
				var j = colOrder[c];
				if (colOrder[c] == null) 
                    innerData += "<td id='"+task_id+"_"+(i+k)+"_"+j+"' style='text-align:center;font-size: 16px;'>"+row[0]+"</td>";
				else if (j==0) {
					// 序號欄：序號按鈕 + Blockly / Scratch 參考答案按鈕，排成一排不換行
					innerData += "<td id='"+task_id+"_"+(i+k)+"_"+j+"' style='text-align:center;white-space:nowrap;'>";
					innerData += "<button class='answer-button' title='"+Blockly.Msg["IMPORTQUESTION_HEADER"]+"' data-value='"+spreadsheetsql_escapeAttr(title)+"' onclick='reloadZoom();document.getElementById(\"javascript_content\").style.display = \"block\";document.getElementById(\"question_input\").value = this.dataset.value;window.toggleImportQuestionForm(false);var iframe = document.getElementById(\"iframe_output\");iframe.contentWindow.document.open();iframe.contentWindow.document.write(\"\");iframe.contentWindow.document.close();iframe.focus();loadExam();'><img src='"+spreadsheetsql_icon_import+"' alt='Blockly'></button>";
					if (row[1] && row[2]) {
						innerData += "<button class='answer-button' title='"+Blockly.Msg["BUTTON_ANSWER_BLOCKLY"]+"' data-path='"+spreadsheetsql_escapeAttr(spreadsheetsql_answerPath(row[1], row[2], "Blockly"))+"' onclick='showAnswer(this.dataset.path);'><img src='"+spreadsheetsql_icon_blockly+"' alt='Blockly'></button>";
						innerData += "<button class='answer-button' title='"+Blockly.Msg["BUTTON_ANSWER_SCRATCH"]+"' data-path='"+spreadsheetsql_escapeAttr(spreadsheetsql_answerPath(row[1], row[2], "Scratch"))+"' onclick='showAnswer(this.dataset.path);'><img src='"+spreadsheetsql_icon_scratch+"' alt='Scratch'></button>";
					}
					innerData += "</td>";
				}
                else
					innerData += "<td id='"+task_id+"_"+(i+k)+"_"+j+"' style='font-size: 16px;'>"+String(row[j]).replace(/\n/g,'<br>')+"</td>";
			}
			innerData += "</tr>";
		}
		
		innerData += "</table>";
		
		div.innerHTML = innerData;  
	}
  }  
  
  function spreadsheetsql_clearDataTable(input_id) {
	if (document.getElementById("gametable_"+input_id))
		document.getElementById("gametable_"+input_id).parentNode.removeChild(document.getElementById("gametable_"+input_id));
  }    

  function spreadsheetsql_getDataCount(count, task_id) {
	if (count=="ROWS")
		return spreadsheetsql_response[task_id].length;
	else if (count=="COLS") {
		var cols = 0;
		if (spreadsheetsql_response[task_id].length>0)
			cols = spreadsheetsql_response[task_id][0].length;
		return cols;
	}
	return 0;
  }  
  
  function spreadsheetsql_clearData(task_id) {
	  spreadsheetsql_response[task_id] = [];
  }   
  
function spreadsheet_insert(func, myData, myRow, myCol, myText, mySpreadsheeturl, mySpreadsheetname, myScript) {
    var postData = {
        func: func,
        spreadsheeturl: mySpreadsheeturl,
        spreadsheetname: mySpreadsheetname,
        row: myRow,
        col: myCol,
        text: myText,
        data: myData
    };

    $.ajax({
        type: "POST",
        url: myScript,
        data: postData,
        dataType: "text",
        crossOrigin: true,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (response) {
            //console.log(response.data);
        },
        error: function (thrownError) {
            console.log(thrownError);
        }
    });
}	 

  function spreadsheet_colsToList(cols, cole) {
	  var colList = "";
	  for (var i=cols;i<=cole;i++){
		colList += String.fromCharCode(65 + (i-1))+",";
	  }
	  colList = colList.substring(0, colList.length-1);
	  return colList;
  }
  
  window.spreadsheetsql_settings = spreadsheetsql_settings;
  window.spreadsheetsql_executeSql = spreadsheetsql_executeSql;
  window.spreadsheetsql_QueryResponse = spreadsheetsql_QueryResponse;
  window.spreadsheetsql_getData = spreadsheetsql_getData;
  window.spreadsheetsql_getCell = spreadsheetsql_getCell;
  window.spreadsheetsql_getDataTable = spreadsheetsql_getDataTable;
  window.spreadsheetsql_getQuestionsList = spreadsheetsql_getQuestionsList;  
  window.spreadsheetsql_clearDataTable = spreadsheetsql_clearDataTable;  
  window.spreadsheetsql_getDataCount = spreadsheetsql_getDataCount;
  window.spreadsheetsql_clearData = spreadsheetsql_clearData;
  window.spreadsheet_insert = spreadsheet_insert;
  window.spreadsheet_colsToList = spreadsheet_colsToList;
  
}(window, window.document));
