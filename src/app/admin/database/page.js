import { apiAnimated } from "@/api/apiAnimated";
import { apiDoodstream } from "@/api/apiDoodstream";
import { apiHentai } from "@/api/apiHentai";
import { apiPorn } from "@/api/apiPorn";
import { apiStreamtape } from "@/api/apiStreamtape";
import Button from "@/ui/uiButton";

export default async function Admin() {
  const { getApiDoodstream } = await apiDoodstream();
  const { getApiStreamtape } = await apiStreamtape();
  const { getApiPorn } = await apiPorn();
  const { getApiAnimated } = await apiAnimated();
  const { getApiHentai } = await apiHentai();

  const apiAll = [...getApiPorn, ...getApiAnimated, ...getApiHentai];

  const doodMap = new Map(getApiDoodstream.map((d) => [d.title, d]));
  const streamMap = new Map(
    getApiStreamtape.map((d) => [d.name.replace(".mp4", ""), d])
  );
  const pachMap = new Map(apiAll.map((d) => [d.id, d]));

  const keys = [
    ...new Set([...doodMap.keys(), ...streamMap.keys(), ...pachMap.keys()]),
  ];

  const result = keys.filter(
    (key) => !(doodMap.has(key) && streamMap.has(key) && pachMap.has(key))
  );

  return (
    <main>
      <table className="text-xs mx-auto my-10">
        <thead>
          <tr>
            <th className="border px-2 py-1">No</th>
            <th className="border px-2 py-1">Doodstream</th>
            <th className="border px-2 py-1">Streamtape</th>
            <th className="border px-2 py-1">PACH</th>
          </tr>
        </thead>

        <tbody>
          {result.map((key, index) => {
            const dood = doodMap.get(key);
            const stream = streamMap.get(key);
            const pach = pachMap.get(key);

            return (
              <tr key={key}>
                <td className="border px-2 py-1">{index + 1}</td>

                <td className="border px-2 py-1">
                  <input
                    className="bg-zinc-800 rounded-full px-2 py-1 text-center"
                    readOnly
                    value={dood?.title ?? "x"}
                  />
                </td>

                <td className="border px-2 py-1">
                  <div className="flex justify-between gap-3">
                    <input
                      className="bg-zinc-800 rounded-full px-2 py-1 text-center"
                      readOnly
                      value={stream?.name.replace(".mp4", "") ?? "x"}
                    />

                    {stream && (
                      <Button
                        href={stream.link}
                        target="_blank"
                        size="sm"
                        variant="primary"
                      >
                        Source
                      </Button>
                    )}
                  </div>
                </td>

                <td className="border px-2 py-1">
                  <div className="flex justify-between gap-3">
                    <input
                      className="bg-zinc-800 rounded-full px-2 py-1 text-center"
                      readOnly
                      value={pach?.id ?? "x"}
                    />

                    <input
                      className="bg-zinc-800 rounded-full px-2 py-1 text-center"
                      readOnly
                      value={pach?.xtitle ?? "x"}
                    />

                    {pach && (
                      <>
                        <Button
                          href={`/${pach.xtype}/${pach.id}`}
                          variant="base"
                          size="sm"
                          className="w-24!"
                        >
                          {pach.xtype}
                        </Button>

                        <Button
                          href={pach.xsource}
                          target="_blank"
                          variant="primary"
                          size="sm"
                        >
                          Source
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
