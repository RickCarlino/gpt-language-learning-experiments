# === EXAMPLE LEMMATIZATION
# This script will take a large body of Korean text and print
# its parts of speech.
# This is useful for extraction of vocabulary from real-world
# reading material.
import stanza  # pip install stanza
# Random Wikipedia article about the chemical ammonia
text = """
암모니아는 질소와 수소로 이루어진 화합물로 분자식은 NH3이다. 끓는점이 약 -33도이므로
실온에서 기체 상태로 존재한다. 특유의 자극적인 냄새가 나며 무색이다. 대기 중에 소량이
존재하며, 천연수에도 미량이 함유되어 있다. 토양 중에도 세균의 질소 유기물의 분해 과정에서
생겨난 암모니아가 존재할 수 있다. 대표적인 반자성체 중 하나이다. 암모니아는 강한 부식성이
있는 맹독성 물질이며, 물에 잘 흡수되는 특성이 있다. 따라서 고농도의 암모니아에 노출될
경우에 점막에 급격히 흡수되어 세포 조직을 치명적 수준으로 파괴하기 때문에 눈, 코, 입,
귀를 막고 신속히 현장을 이탈해야 한다. 20세기 초에 프리츠 하버가 공기 중의 질소를 이용한
암모니아 합성법을 개발하였고 이를 통해 요소 비료를 대량생산 하게 되었다. 이로써 식물의
성장을 위한 단백질 합성에 필수 요소인 질소를 저렴한 가격의 화학 비료를 통해 토양에 공급할
수 있게 되었고, 곡물 생산성이 크게 향상되어 인류는 굶주림의 공포에서 해방되었다. 암모니아는
냉매, 용매, 소독세정제로 이용되고 합성수지 제조 등 화학공업의 다양한 분야에 널리 사용되고 있다. 
"""
nlp = stanza.Pipeline('ko', use_gpu=False, download_method=None)
doc = nlp(text)
relevant = [
    'mag',
    'maj',
    'nbn',
    'ncn',
    'ncpa',
    'ncps',
    'npp',
    'nq',
    'pvg',
    'xsv',
]
for sentence in doc.sentences:
    for word in sentence.words:
        a = word.xpos.split('+')
        b = word.lemma.split('+')
        if len(a) is len(b):
            for pair in list(zip(a, b)):
                if pair[0] in relevant:
                    print(pair)
        else:
            # Not sure how to "zip" these.
            # A small percentage of words
            # Have asymetrical word<=>xpos pairings.
            print("REJECT: ", a, b)
# === RESOURCES:
#     Docs:   https://stanfordnlp.github.io/stanza/mwt.html
#     Thanks: https://mindscale.kr/course/python-text-analysis/stanza-tagging/
# List of properties available on "word" instances:
#     'add_property',
#     'deprel',
#     'deps',
#     'end_char',
#     'feats',
#     'head',
#     'id',
#     'lemma',
#     'misc',
#     'parent',
#     'pos',
#     'pretty_print',
#     'sent',
#     'start_char',
#     'text',
#     'to_dict',
#     'upos',
#     'xpos',